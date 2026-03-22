import type { CalloutBlock } from "@/lib/types";

export function Callout({ heading, body }: CalloutBlock) {
  return (
    <div className="!mt-20 mb-16 flex flex-col gap-3 rounded-[10px] bg-[#262626] p-5">
      {/* Icon pill */}
      <div className="flex h-10 w-10 items-center justify-center rounded-[4px] bg-[#171717]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a3a3a3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </div>

      {/* Heading + left-rule body */}
      <div className="flex flex-col gap-2">
        <p className="font-body font-semibold text-[16px] text-[#d4d4d4] leading-[1.5]">
          {heading}
        </p>
        <div className="flex gap-[10px] items-stretch">
          <div className="w-px bg-[#a3a3a3] shrink-0" />
          <p className="font-body font-light text-[16px] text-[#a3a3a3] leading-[1.6] tracking-[0.4px]">
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}
