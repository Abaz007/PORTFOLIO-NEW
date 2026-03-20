"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useCallback, useState } from "react";
import type { CaseStudy } from "@/lib/types";

type Props = {
  caseStudies: CaseStudy[];
};

const CARD_H = 500;
const CARD_W = 680;
const GAP = 16;
const SPEED = 1.2; // px per animation frame (~72px/s at 60fps)

function WorkCard({ study, tabIndex }: { study: CaseStudy; tabIndex: number }) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className="group relative shrink-0 overflow-hidden rounded-[20px] bg-[#1e1e1e] block"
      style={{ width: CARD_W, height: CARD_H }}
      tabIndex={tabIndex}
      draggable={false}
    >
      {study.meta.cover_video ? (
        <video
          src={study.meta.cover_video}
          poster={study.meta.cover_image}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <Image
          src={study.meta.cover_image}
          alt={study.meta.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          draggable={false}
        />
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-6">
        <p className="font-body font-normal text-[15px] text-white leading-tight">
          {study.meta.title}
        </p>
        <p className="font-body font-light text-[13px] text-white/60 mt-1">
          {study.meta.descriptor}
        </p>
      </div>
    </Link>
  );
}

export function FeaturedWork({ caseStudies }: Props) {
  const outerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  // Repeat 4× so the strip fills ultra-wide viewports seamlessly
  const repeated = [
    ...caseStudies,
    ...caseStudies,
    ...caseStudies,
    ...caseStudies,
  ];

  const animate = useCallback(() => {
    const el = outerRef.current;
    if (el && !isDragging.current) {
      el.scrollLeft += SPEED;
      // Seamless loop: reset when we've scrolled through half the total content
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
      }
    }
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate]);

  // Track mouse position for custom cursor
  function onSectionMouseMove(e: React.MouseEvent<HTMLElement>) {
    mousePos.current = { x: e.clientX, y: e.clientY };
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }

    // Also handle drag
    if (!isDragging.current) return;
    const dx = startX.current - e.clientX;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    if (outerRef.current) outerRef.current.scrollLeft = startScroll.current + dx;
  }

  function onMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.clientX;
    startScroll.current = outerRef.current?.scrollLeft ?? 0;
  }

  function onDragEnd() {
    isDragging.current = false;
  }

  // Prevent link navigation when user was dragging (not just clicking)
  function onClickCapture(e: React.MouseEvent) {
    if (hasDragged.current) e.preventDefault();
  }

  return (
    <section
      className="pb-28 select-none relative"
      onMouseMove={onSectionMouseMove}
      onMouseLeave={() => {
        setIsHoveringCard(false);
        onDragEnd();
      }}
    >
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ opacity: isHoveringCard && !isDragging.current ? 1 : 0 }}
      >
        <div className="bg-[#121212] text-white font-mono font-light text-[13px] tracking-[0.3px] px-5 py-3 rounded-full whitespace-nowrap">
          View Case Study
        </div>
      </div>

      <div
        ref={outerRef}
        className="overflow-x-scroll overflow-y-hidden"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          cursor: "none",
        } as React.CSSProperties}
        onMouseDown={onMouseDown}
        onMouseUp={onDragEnd}
        onClickCapture={onClickCapture}
        onMouseEnter={() => setIsHoveringCard(true)}
        onMouseLeave={() => setIsHoveringCard(false)}
      >
        <div
          style={{
            display: "flex",
            gap: GAP,
            width: "max-content",
            paddingLeft: GAP,
            paddingRight: GAP,
          }}
        >
          {repeated.map((study, i) => (
            <WorkCard
              key={`${study.slug}-${i}`}
              study={study}
              tabIndex={i < caseStudies.length ? 0 : -1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
