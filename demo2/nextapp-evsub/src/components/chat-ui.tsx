"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { tv } from "tailwind-variants";

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
  
  // Define message bubble styles with tails
  const messageBubble = tv({
    base: "max-w-[70%] p-3 rounded-lg relative",
    variants: {
      isUser: {
        true: "bg-primary text-white rounded-tr-none after:content-[''] after:absolute after:top-0 after:right-[-8px] after:border-[8px] after:border-transparent after:border-l-primary after:border-t-primary",
        false: "bg-default-100 dark:bg-default-200 rounded-tl-none after:content-[''] after:absolute after:top-0 after:left-[-8px] after:border-[8px] after:border-transparent after:border-r-default-100 after:border-t-default-100 dark:after:border-r-default-200 dark:after:border-t-default-200"
      }
    }
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Initial scroll to bottom on component mount
  useEffect(() => {
    if (messagesEndRef.current && messages.length > 0) {
      messagesEndRef.current.scrollIntoView();
    }
  }, []);

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
    <div className={`flex-grow flex flex-col w-full border border-default-200 rounded-lg overflow-hidden sm:max-w-full md:max-w-3xl mx-auto`}>
      {/* Messages container */}
      <div className="h-[72vh]">
        <div 
          ref={messagesContainerRef}
          className={`h-full p-4 overflow-y-auto min-h-0`}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={messageBubble({ isUser: message.isUser })}
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
      </div>
      
      {/* Input area */}
      <div className="border-t border-default-200 p-2 sm:p-4 bg-default-50 dark:bg-default-100/20 h-[80px]">
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
