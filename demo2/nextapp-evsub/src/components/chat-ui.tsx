"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

interface ChatUIProps {
  height?: string;
  initialMessages?: Message[];
}

export const ChatUI = ({ 
  height = "500px", 
  initialMessages = [] 
}: ChatUIProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputText.trim() === "") return;
    
    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputText("");
    
    // Simulate a response (for demo purposes)
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "This is a response to your message.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, 1000);
  };

  return (
    <div className={`flex flex-col w-full h-[${height}] border border-default-200 rounded-lg overflow-hidden sm:max-w-full md:max-w-3xl mx-auto`}>
      {/* Messages container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 p-4 overflow-y-auto"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex mb-4 ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isUser
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-default-100 dark:bg-default-200 rounded-tl-none"
              }`}
            >
              <p>{message.text}</p>
              <div 
                className={`text-xs mt-1 ${
                  message.isUser ? "text-white/70" : "text-default-500"
                }`}
              >
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="border-t border-default-200 p-2 sm:p-4 bg-default-50 dark:bg-default-100/20">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            size="sm"
            radius="lg"
          />
          <Button 
            type="submit" 
            color="primary"
            radius="lg"
            size="sm"
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
