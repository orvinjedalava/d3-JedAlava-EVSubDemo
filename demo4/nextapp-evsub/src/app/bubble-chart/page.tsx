'use client';

import React from 'react';
import ZoomableBubbleChart from '../../components/zoomable-bubble-chart';

export default function BubbleChartPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Zoomable Car Bubble Chart</h1>
      <p className="text-center mb-8 text-gray-600">
        Click on a bubble to zoom in. Click on the background to zoom out.
        <br />
        Bubble size is determined by priority (higher priority number = larger bubble).
      </p>
      <div className="bg-black rounded-lg shadow-lg p-6">
        <ZoomableBubbleChart />
      </div>
    </div>
  );
}
