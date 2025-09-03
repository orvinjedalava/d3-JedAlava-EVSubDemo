'use client';

import React, { useEffect, useRef } from 'react';
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

// Define types for D3 hierarchy data
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

const ZoomableBubbleChart: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Transform the cars data to match D3's hierarchy format
  const transformData = (data: CarNode[]): TransformedNode => {
    // Create a root node to contain all car types
    const root: TransformedNode = {
      name: "Cars",
      children: data.map(carType => ({
        name: carType.name,
        // Inverse priority for bubble size (lower priority = larger bubble)
        // Using a multiplier to make the size differences more noticeable
        value: carType.priority === 1 ? 100 : (6 - carType.priority) * 20,
        children: carType.nodes.map(manufacturer => ({
          name: manufacturer.name,
          value: manufacturer.priority === 1 ? 80 : (6 - manufacturer.priority) * 15,
          children: manufacturer.nodes.map(model => ({
            name: model.name,
            value: model.priority === 1 ? 60 : (6 - model.priority) * 10,
          }))
        }))
      }))
    };
    
    return root;
  };

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove();

    // Specify the chart's dimensions
    const width = 928;
    const height = width;

    // Create the color scale
    const color = d3.scaleLinear<string>()
      .domain([0, 5])
      .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
      .interpolate(d3.interpolateHcl);

    // Transform the data
    const hierarchyData = transformData(carsData);

    // Compute the layout
    const pack = (data: any) => d3.pack()
      .size([width, height])
      .padding(3)
      (d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => (b.value || 0) - (a.value || 0)));
    
    const root = pack(hierarchyData);

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .style("max-width", "100%")
      .style("height", "auto")
      .style("display", "block")
      .style("margin", "0 auto")
      .style("background", color(0))
      .style("cursor", "pointer");

    // Append the nodes
    const node = svg.append("g")
      .selectAll("circle")
      .data(root.descendants().slice(1))
      .join("circle")
        .attr("fill", d => d.children ? color(d.depth) : "white")
        .attr("pointer-events", d => !d.children ? "none" : null)
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

    // Append the text labels
    const label = svg.append("g")
      .style("font", "10px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text(d => (d.data as any).name);

    // Create the zoom behavior and zoom immediately in to the initial focus node
    svg.on("click", (event) => zoom(event, root));
    let focus = root;
    let view: [number, number, number];
    zoomTo([focus.x, focus.y, focus.r * 2]);

    function zoomTo(v: [number, number, number]) {
      const k = width / v[2];

      view = v;

      label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
    }

    function zoom(event: any, d: any) {
      const focus0 = focus;
      focus = d;

      const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", () => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

      // Use type assertions to help TypeScript understand our D3 code
      label
        .filter(function(d: any) { 
          // @ts-ignore - D3 sets 'this' to the DOM element
          return d.parent === focus || this.style.display === "inline"; 
        })
        .transition(transition as any)
          .style("fill-opacity", (d: any) => d.parent === focus ? 1 : 0)
          .on("start", function(d: any) { 
            // @ts-ignore - D3 sets 'this' to the DOM element
            if (d.parent === focus) this.style.display = "inline"; 
          })
          .on("end", function(d: any) { 
            // @ts-ignore - D3 sets 'this' to the DOM element
            if (d.parent !== focus) this.style.display = "none"; 
          });
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="w-full flex justify-center">
      <svg ref={svgRef} className="w-full max-w-4xl"></svg>
    </div>
  );
};

export default ZoomableBubbleChart;
