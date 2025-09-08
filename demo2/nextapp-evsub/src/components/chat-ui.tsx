"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@heroui/input";
import { tv } from "tailwind-variants";
import { Button, ButtonGroup } from "@heroui/button";
import { useCarGroupStore } from "@/stores/animations/cards-panel-store";
import { CardDisplayMode } from "@/types";

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

  const { 
      carCardStates,
      setCarCardPosition,
      setCarCardMode
    } = useCarGroupStore();
  
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

  const onNext = () => {
    setCarCardPosition(0, { left: 200, zIndex: 1 });
    setCarCardMode(0, CardDisplayMode.ShowCriteria | CardDisplayMode.ShowButton); // Set to Clickable
    setCarCardPosition(1, { opacity: 0.4 });
  }

  const onBack = () => {
    setCarCardPosition(0, { left: 20, zIndex: 0 });
    setCarCardMode(0,  CardDisplayMode.ShowCriteria); // Set to Clickable
    setCarCardPosition(1, { opacity: 1 });
  }

  const onResize = () => {
    const carCard = carCardStates[0];

    setCarCardPosition(0, 
      { 
        width: carCard.displayProperties.width === 253 ? 715 : 253, 
        height: carCard.displayProperties.height === 350 ? 688 : 350,
        left: carCard.displayProperties.left === 200 ? 50 : 200, 
      });

    setCarCardMode(0,  carCard.displayMode & CardDisplayMode.Expand ? 
      CardDisplayMode.ShowCriteria | CardDisplayMode.ShowButton 
      : CardDisplayMode.ShowCriteria | CardDisplayMode.ShowButton | CardDisplayMode.Expand) ; // Set to Clickable
  }

  return (
    <div className={`flex-grow flex flex-col gap-1 w-full overflow-hidden sm:max-w-full md:max-w-3xl mx-auto justify-center`}>
      {/* Messages container */}
      <div className="h-[60vh] border border-default-200 rounded-lg overflow-hidden">
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
      <div className="py-2 sm:py-4 h-[80px]">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message here"
            className="flex-1"
            size="sm"
            radius="lg"
            label="How can I help you today?"
            labelPlacement="outside"
            
          />
          {/* <Button 
            type="submit" 
            color="primary"
            radius="lg"
            size="sm"
            
          >
            Send
          </Button> */}
        </form>
      </div>
      <div className="p-8 flex flex-row justify-center">
        <ButtonGroup>
          <Button variant="solid" onPress={onNext}>Next</Button>
          <Button variant="solid" onPress={onBack}>Back</Button>
          <Button variant="solid" onPress={onResize}>Resize</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
