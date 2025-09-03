'use client';

import { useEffect, useState, useRef } from 'react';
import ZoomableBubbleChart from '@/components/zoomable-bubble-chart';

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dimensions, setDimensions] = useState({ width: 700, height: 700 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Update dimensions when the component mounts and on window resize
  // useEffect(() => {
  //   const updateDimensions = () => {
  //     if (containerRef.current) {
  //       const { width, height } = containerRef.current.getBoundingClientRect();
  //       setDimensions({
  //         width: Math.max(width - 40, 580), // Subtract padding and set minimum width
  //         height: Math.max(height - 180, 580) // Subtract padding and set minimum height
  //       });
  //     }
  //   };

  //   // Initial update
  //   updateDimensions();

  //   // Add resize event listener
  //   window.addEventListener('resize', updateDimensions);

  //   // Clean up
  //   return () => {
  //     window.removeEventListener('resize', updateDimensions);
  //   };
  // }, []);

  return (
    <section className="flex-grow w-full relative flex flex-col gap-2 lg:flex-row">
      <div className="h-screen lg:h-auto lg:w-1/3 flex flex-col py-8">{children}</div>
      {/* <div className="h-screen lg:h-auto lg:w-2/3 flex flex-col items-center justify-center">Canvas goes here</div> */}
      <div ref={containerRef} className="h-screen lg:h-auto lg:w-2/3 flex flex-col py-8">
        {/* <ZoomableBubbleChart width={dimensions.width} height={dimensions.height} /> */}
        <ZoomableBubbleChart width={780} height={860} /> 
      </div>
    </section>
  );
}
