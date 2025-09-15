import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Zoomable Bubble Chart",
  description: "Interactive D3.js zoomable bubble chart visualization of car data",
};

export default function BubbleChartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full">{children}</div>
    </section>
  );
}
