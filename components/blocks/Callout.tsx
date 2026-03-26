import type { CalloutBlock } from "@/lib/types";

export function Callout({ heading, body, no_icon }: CalloutBlock) {
  return (
    <div className="!mt-20 mb-16 relative flex flex-col gap-3 rounded-[10px] bg-[#262626] p-5 overflow-hidden">
      {/* Decorative quote mark — top-right, rotated 180° */}
      {!no_icon && <svg
        className="absolute top-0 right-0 opacity-20 pointer-events-none"
        width="80"
        height="60"
        viewBox="0 0 80 60"
        fill="none"
        aria-hidden="true"
      >
        <text
          x="80"
          y="60"
          textAnchor="end"
          fontSize="96"
          fontFamily="Georgia, serif"
          fill="#a3a3a3"
          transform="rotate(180 40 30)"
        >
          &ldquo;
        </text>
      </svg>}

      <p className="font-body font-medium text-[16px] text-[#d4d4d4] leading-[1.5]">
        {heading}
      </p>
      <p className="font-body font-light text-[14px] text-[#a3a3a3] leading-[1.73] tracking-[0.6px]">
        {body}
      </p>
    </div>
  );
}
