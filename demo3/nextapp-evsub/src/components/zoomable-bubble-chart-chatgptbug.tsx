'use client';

import React, { useState, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import carsData from '../data/cars.json';

interface CarNode {
  name: string;
  level: number;
  priority: number;
  nodes: CarNode[];
}

interface TransformedNode {
  name: string;
  children?: TransformedNode[];
  value?: number;
}

interface ZoomableBubbleChartProps {
  width?: number;
  height?: number;
}

// Define types for D3 hierarchy node
interface HierarchyNode {
  data: {
    name: string;
    value?: number;
    children?: any[];
  };
  depth: number;
  height: number;
  parent: HierarchyNode | null;
  x: number;
  y: number;
  r: number;
  children?: HierarchyNode[];
}

const ZoomableBubbleChart: React.FC<ZoomableBubbleChartProps> = ({ 
  width = 700, 
  height = 700 
}) => {
  // State to hold computed nodes
  const [nodes, setNodes] = useState<HierarchyNode[]>([]);
  const [rootNode, setRootNode] = useState<HierarchyNode | null>(null);
  
  // State for zoom functionality
  const [focus, setFocus] = useState<HierarchyNode | null>(null);
  const [view, setView] = useState<[number, number, number]>([0, 0, 1]);

  // Transform the cars data to match D3's hierarchy format
  const transformData = useCallback((data: CarNode[]): TransformedNode => {
    // Create a root node to contain all car types
    const root: TransformedNode = {
      name: "Cars",
      children: data.map(carType => ({
        name: carType.name,
        value: carType.priority * 20,
        children: carType.nodes.map(manufacturer => ({
          name: manufacturer.name,
          value: carType.priority * manufacturer.priority * 15,
          children: manufacturer.nodes.map(model => ({
            name: model.name,
            value: carType.priority * model.priority * 10,
          }))
        }))
      }))
    };
    
    return root;
  }, []);

  // Create color scale
  const colorScale = d3.scaleLinear<string>()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

  // Calculate zoom transformation
  const zoomTo = useCallback((v: [number, number, number]) => {
    setView(v);
  }, []);

  // Handle zoom when clicking on a node
  const handleZoom = useCallback((event: React.MouseEvent, d: HierarchyNode) => {
    if (focus === d) return;
    
    event.stopPropagation();
    setFocus(d);
    
    // Animate the zoom transition
    const startView = view;
    const endView: [number, number, number] = [d.x, d.y, d.r * 2];
    
    // Use requestAnimationFrame for a simple animation
    let startTime: number | null = null;
    const duration = event.altKey ? 7500 : 750;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Interpolate between start and end views
      const i = d3.interpolateZoom(startView, endView);
      zoomTo(i(progress));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [focus, view, zoomTo]);

  // Compute the layout
  useEffect(() => {
    const hierarchyData = transformData(carsData);
    
    const pack = d3.pack<TransformedNode>()
      .size([width, height])
      .padding(3);
    
    const root = pack(d3.hierarchy<TransformedNode>(hierarchyData)
      .sum(d => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0))) as HierarchyNode;
    
    setNodes(root.descendants());
    setRootNode(root);
    
    // Initialize focus to root and set initial view
    if (!focus) {
      setFocus(root);
      zoomTo([root.x, root.y, root.r * 2]);
    }
  }, [width, height, transformData, focus, zoomTo]);

  // Calculate transformation for each node based on current view
  const getNodeTransform = (node: HierarchyNode) => {
    if (!view) return '';
    const [x, y, r] = view;
    const k = width / r;
    return `translate(${(node.x - x) * k},${(node.y - y) * k})`;
  };

  // Calculate radius for each node based on current view
  const getNodeRadius = (node: HierarchyNode) => {
    if (!view) return 0;
    const [, , r] = view;
    const k = width / r;
    return node.r * k;
  };

  // Determine if a label should be visible
  const isLabelVisible = (node: HierarchyNode) => {
    return focus && node.parent === focus;
  };

  return (
    <div className="flex-grow w-full flex flex-col justify-center">
      <svg 
        width={width} 
        height={height} 
        viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
        style={{ 
          display: 'block', 
          margin: '0 auto', 
          cursor: 'pointer'
        }}
        onClick={(e) => rootNode && handleZoom(e, rootNode)}
      >
        {/* Render circles for each node */}
        <g>
          {nodes.slice(1).map((node, i) => (
            <circle
              key={`${node.data.name}-${i}`}
              transform={getNodeTransform(node)}
              r={getNodeRadius(node)}
              fill={node.children ? colorScale(node.depth) : "white"}
              pointerEvents={!node.children ? "none" : "auto"}
              stroke={null}
              onMouseOver={(e) => e.currentTarget.setAttribute('stroke', '#000')}
              onMouseOut={(e) => e.currentTarget.setAttribute('stroke', '')}
              onClick={(e) => handleZoom(e, node)}
            />
          ))}
        </g>
        
        {/* Render text labels */}
        <g style={{ font: '10px sans-serif', pointerEvents: 'none', textAnchor: 'middle' }}>
          {nodes.map((node, i) => (
            <text
              key={`label-${node.data.name}-${i}`}
              transform={getNodeTransform(node)}
              style={{
                fillOpacity: isLabelVisible(node) ? 1 : 0,
                display: isLabelVisible(node) ? 'inline' : 'none'
              }}
            >
              {node.data.name}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default ZoomableBubbleChart;