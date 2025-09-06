'use client';

import { useEffect, useState, useRef } from 'react';
import ZoomableBubbleChart from '@/components/zoomable-bubble-chart';
import { ChatUI } from "@/components/chat-ui";
import { motion } from 'framer-motion';
import { CardsPanel } from '@/components/cards-panel';
import { useTransitionState } from 'next-transition-router';
import { appSettings } from '@/config/app';

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

// Sample initial messages for demonstration
const initialMessages = [
  {
    id: "1",
    text: "Hello! How can I help you today?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 15) // 15 minutes ago
  },
  {
    id: "2",
    text: "I have a question about your services.",
    isUser: true,
    timestamp: new Date(Date.now() - 60000 * 14) // 14 minutes ago
  },
  {
    id: "3",
    text: "Of course! I'd be happy to help. What would you like to know?",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 13) // 13 minutes ago
  },
  {
    id: "4",
    text: "I'm interested in your premium subscription. What features does it include?",
    isUser: true,
    timestamp: new Date(Date.now() - 60000 * 12) // 12 minutes ago
  },
  {
    id: "5",
    text: "Our premium subscription includes unlimited access to all features, priority customer support, and exclusive content updates.",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 11) // 11 minutes ago
  },
  {
    id: "6",
    text: "That sounds great! How much does it cost?",
    isUser: true,
    timestamp: new Date(Date.now() - 60000 * 10) // 10 minutes ago
  },
  {
    id: "7",
    text: "The premium subscription is $9.99 per month, or you can save with our annual plan at $99 per year.",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 9) // 9 minutes ago
  },
  {
    id: "8",
    text: "Is there a free trial available?",
    isUser: true,
    timestamp: new Date(Date.now() - 60000 * 8) // 8 minutes ago
  },
  {
    id: "9",
    text: "Yes! We offer a 14-day free trial for all new users. You can cancel anytime during the trial period.",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 7) // 7 minutes ago
  },
  {
    id: "10",
    text: "Perfect! I'd like to sign up for the trial.",
    isUser: true,
    timestamp: new Date(Date.now() - 60000 * 6) // 6 minutes ago
  },
  {
    id: "11",
    text: "Great choice! To get started, please create an account on our website or through our mobile app.",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 5) // 5 minutes ago
  },
  {
    id: "12",
    text: "I'll do that right away. Do you have any special offers for new users?",
    isUser: true,
    timestamp: new Date(Date.now() - 60000 * 4) // 4 minutes ago
  },
  {
    id: "13",
    text: "Yes! New users who sign up for an annual plan after their trial get 20% off their first year.",
    isUser: false,
    timestamp: new Date(Date.now() - 60000 * 3) // 3 minutes ago
  }
];

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dimensions, setDimensions] = useState({ width: 700, height: 700 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { stage } = useTransitionState();


  return (
    <section className="flex-grow w-full relative flex flex-col gap-2 lg:flex-row">
      <div className="h-screen lg:h-auto lg:w-1/3 flex flex-col py-8">
      <motion.div
        className="flex-grow flex flex-col"
        initial="initial"
        animate={ stage === 'leaving' ? variants.exit : variants.animate }
        variants={variants}
        transition={{ duration: appSettings.transitionDuration }}
      >
      <ChatUI initialMessages={initialMessages} height="800px" />
      
    </motion.div></div>
      <div ref={containerRef} className="h-screen lg:h-auto lg:w-2/3 flex flex-col py-8 border border-red-500">
        {/* <ZoomableBubbleChart width={780} height={860} />  */}
        <CardsPanel width={780} height={860} />
      </div>
    </section>
  );
}
