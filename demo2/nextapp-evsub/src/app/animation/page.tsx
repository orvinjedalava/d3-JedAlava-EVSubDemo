'use client';

import { useEffect, useState, useRef } from 'react';
import ZoomableBubbleChart from '@/components/zoomable-bubble-chart';
import { ChatUI } from "@/components/chat-ui";
import { motion } from 'framer-motion';
import { CardsPanel } from '@/components/cards-panel';
import { useTransitionState } from 'next-transition-router';
import { appSettings } from '@/config/app';
import { Button } from '@heroui/button';
import { useCarGroupStore } from "@/stores/animations/cards-panel-store";
import type { CarCardState, CarCardDetail, CarCardDisplayProperties } from '@/types';
import { CardDisplayMode } from '@/types';
import { motionOpacity } from '@/utils/framer-motion-helpers';
import { getCars } from '@/actions/get-cars';

// const variants = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 }
// }

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

const carCardDetails: CarCardDetail[] = [
  {
    title: "Volvo EX30",
    subtitle: "Ultra Single Motor 2023",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
    img: "/images/Volvo EX30.png",
    criteria: {
      "Weekly Cost": "$325.50",
      "Odometer": "43,793 km",
      "Fuel Efficiency": "12.5 km/L",
      "Service Due": "5,000km",
      "Next Service Date": "15 March 2044",
      "Loan": "$295.80",
      "Subscription": "$295.80",
      "Lease": "$295.80",
    }
  },
  {
    title: "KIA EV5",
    subtitle: "Earth 2025",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit magnam voluptatem repudiandae perferendis ipsam maiores nostrum dolor earum numquam, quisquam facere inventore consectetur a est dolorem impedit nam. Maiores, dolorem?",
    img: "/images/KIA EV5 Earth 2025.png",
    criteria: {
      "Weekly Cost": "$295.80",
      "Odometer": "43,793 km",
      "Fuel Efficiency": "15.5 km/L",
      "Service Due": "8,000km",
      "Next Service Date": "15 Aug 2044",
      "Loan": "$195.80",
      "Subscription": "$195.80",
      "Lease": "$195.80",
    }
  },
  
];

const carCardDisplayProperties: CarCardDisplayProperties[] = [
  { width: 253, height: 350, top: 80, left: 50, opacity: 1 , zIndex: 0},
  { width: 253, height: 350, top: 350, left: 500, opacity: 1 , zIndex: 0},
//   { width: 253, height: 276, top: 0, left: 250, opacity: 1 },
//   { width: 253, height: 276, top: 0, left: 350, opacity: 1 },
];

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dimensions, setDimensions] = useState({ width: 700, height: 700 });
  const containerRef = useRef<HTMLDivElement>(null);
  const { stage } = useTransitionState();

  const { 
    carCardStates,
    setCarCardStates,
  } = useCarGroupStore();

  useEffect(() => {
    // Wrap async logic in an IIFE since useEffect cannot be async
    (async () => {
      // Await the cars data
      const cars = await getCars();
      // Create an array of CarCardState objects by combining
      // the carCardDetails and carCardDisplayProperties arrays
      const initialCardStates: CarCardState[] = cars.map((detail, index) => {
        // Get the display properties for this card, or use defaults if not available
        const displayProperties = carCardDisplayProperties[index];

        // Return the CarCardState object with separate detail and displayProperties
        return {
          displayProperties,
          detail,
          displayMode: CardDisplayMode.ShowCriteria
        };
      });

      // Update the store with the combined data
      setCarCardStates(initialCardStates);

      // Log for debugging
      console.log("Initialized card states:", initialCardStates);
    })();
  }, []);

  
  return (
    <section className="flex-grow w-full relative flex flex-col gap-2 lg:flex-row">
      <div className="h-screen lg:h-auto lg:w-1/4 flex flex-col py-8">
      <motion.div
        className="flex-grow flex flex-col"
        initial="initial"
        animate={ stage === 'leaving' ? motionOpacity.exit : motionOpacity.animate }
        variants={motionOpacity}
        transition={{ duration: appSettings.transitionDuration }}
      >
      <ChatUI initialMessages={initialMessages} height="800px" />
      
    </motion.div></div>
      <div ref={containerRef} className="h-screen lg:h-auto lg:w-3/4 flex flex-col py-8 border border-red-500">
        {/* <ZoomableBubbleChart width={780} height={860} />  */}
        <CardsPanel width={780} height={860} />
      </div>
    </section>
  );
}
