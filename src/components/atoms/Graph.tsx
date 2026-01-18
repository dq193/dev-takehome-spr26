"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

type Node = {
  id: string;
  group: number;
  desc?: string;
};

type Link = {
  source: string;
  target: string;
};

const nodes: Node[] = [
  { id: "Me", group: 0, desc: "What's up?" },

  { id: "Computer Science", group: 1, desc: "Who could've guessed?" },

  { id: "Low-level stuff", group: 1 },
  { id: "Operating systems", group: 1, desc: "I've made a very basic one with paging and a filesystem" },
  { id: "Assembly", group: 1, desc: "I'm best at x86_64 but I've dabbled with ARM and M68K" },
  { id: "Microcontrollers", group: 1, desc: "Basically just messing around with Arduinos and similar for all sorts of purposes" },

  { id: "High-level stuff", group: 1 },
  { id: "ReactJS", group: 1, desc: "Pretty much the entirety of my last job" },
  { id: "SQLite", group: 1, desc: "My DB of choice in personal projects!" },

  { id: "Mathematics", group: 2, desc: "Almost like it as much as CS" },
  { id: "Complex Analysis", group: 2, desc: "Integrating over contours is really fun" },
  { id: "Number Theory", group: 2, desc: "I like modular arithmetic a bunch" },

  { id: "Art", group: 3 },
  { id: "Pencil stuff", group: 3, desc: "My favorite medium, both for doodles and big fancy drawings" },
  { id: "Pen & Ink", group: 3, desc: "Looks really nice when it's done well" }
];

const links: Link[] = [
  { source: "Me", target: "Computer Science" },
  { source: "Me", target: "Mathematics" },
  { source: "Me", target: "Art" },

  { source: "Computer Science", target: "Low-level stuff" },
  { source: "Computer Science", target: "High-level stuff" },

  { source: "Low-level stuff", target: "Operating systems" },
  { source: "Low-level stuff", target: "Assembly" },
  { source: "Low-level stuff", target: "Microcontrollers" },

  { source: "High-level stuff", target: "ReactJS" },
  { source: "High-level stuff", target: "SQLite" },

  { source: "Mathematics", target: "Complex Analysis" },
  { source: "Mathematics", target: "Number Theory" },

  { source: "Art", target: "Pencil stuff" },
  { source: "Art", target: "Pen & Ink" },

];

export default function Graph() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const imgWidth = 800;
  const imgHeight = 600;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const simulation = d3
      .forceSimulation(nodes as any)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d: any) => d.id)
          .distance(90)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(imgWidth / 2, imgHeight / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#94a3b8")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg
      .append("g")
      .selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => (d.id === "You" ? 14 : 9))
      .attr("fill", (d) =>
        d.group === 0
          ? "#22c55e"
          : d.group === 1
          ? "#3b82f6"
          : d.group === 2
          ? "#a855f7"
          : "#f97316"
      )
      .call(
        d3
          .drag<SVGCircleElement, Node>()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      );

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.id)
      .attr("font-size", 12)
      .attr("fill", "#e5e7eb")
      .attr("dx", 12)
      .attr("dy", "0.35em");

    node.append("title").text((d) => d.desc || d.id);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      label
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    function dragStarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragEnded(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <svg
        ref={svgRef}
        width={imgWidth}
        height={imgHeight}
        className="rounded-xl bg-slate-900 border border-slate-700"
      />
    </div>
  );
}
