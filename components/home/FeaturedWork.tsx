"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useCallback, useState } from "react";
import type { CaseStudy } from "@/lib/types";

type Props = {
  caseStudies: CaseStudy[];
};

const GAP = 16;
const SPEED = 1.2;

function WorkCard({ study, tabIndex }: { study: CaseStudy; tabIndex: number }) {
  return (
    <Link
      href={`/case-study/${study.slug}`}
      className="group relative shrink-0 overflow-hidden rounded-[20px] bg-[#1e1e1e] block w-[260px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[680px] md:h-[500px]"
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
      {/* Overlay — always visible on mobile, hover-only on desktop */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-4 md:p-6">
        <p className="font-body font-normal text-[14px] md:text-[15px] text-white leading-tight">
          {study.meta.title}
        </p>
        <p className="font-body font-light text-[12px] md:text-[13px] text-white/60 mt-1">
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

  // Mouse handlers
  function onSectionMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${e.clientX}px`;
      cursorRef.current.style.top = `${e.clientY}px`;
    }
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

  function onClickCapture(e: React.MouseEvent) {
    if (hasDragged.current) e.preventDefault();
  }

  // Touch handlers for mobile
  function onTouchStart(e: React.TouchEvent<HTMLDivElement>) {
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.touches[0].clientX;
    startScroll.current = outerRef.current?.scrollLeft ?? 0;
  }

  function onTouchMove(e: React.TouchEvent<HTMLDivElement>) {
    if (!isDragging.current) return;
    const dx = startX.current - e.touches[0].clientX;
    if (Math.abs(dx) > 4) hasDragged.current = true;
    if (outerRef.current) outerRef.current.scrollLeft = startScroll.current + dx;
  }

  function onTouchEnd() {
    isDragging.current = false;
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
      {/* Custom cursor — desktop only */}
      <div
        ref={cursorRef}
        className="hidden md:block pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
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
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
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
