import type { ResearchCalloutBlock } from "@/lib/types";

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <rect width="20" height="20" rx="10" fill="#262626"/>
      <path d="M13.8911 7.32617L8.54384 12.6734L6.11328 10.2428" stroke="#22C55E" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function ResearchCallout({ variant = "default", label = "KEY FINDINGS", items, body }: ResearchCalloutBlock) {
  if (variant === "metrics") {
    return (
      <div className="w-full flex flex-col gap-1">
        {/* Label cell */}
        <div className="border border-[#262626] px-6 py-4">
          <span className="font-mono font-extralight text-[12px] text-[#a3a3a3] uppercase leading-5">
            {label}
          </span>
        </div>
        {/* Items cell */}
        <div className="border border-[#262626] px-6 py-4 flex flex-col gap-4">
          {items && items.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckIcon />
              <p className="font-body font-light text-[12px] text-[#a3a3a3] leading-5">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[10px] bg-[#262626] p-5 flex flex-col gap-3">
      <p className="font-body text-[13px] text-[#4ade80] leading-[1.5]">
        {label}
      </p>
      <div className="flex gap-2 items-stretch">
        <div className="w-px bg-[#22c55e] shrink-0" />
        {items && items.length > 0 ? (
          <ul className="list-disc pl-5 flex flex-col gap-0">
            {items.map((item, i) => (
              <li
                key={i}
                className="font-body font-light text-[14px] text-[#d4d4d4] leading-[1.73] tracking-[0.6px]"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : body ? (
          <p className="font-body font-light text-[14px] text-[#d4d4d4] leading-[1.73] tracking-[0.6px]">
            {body}
          </p>
        ) : null}
      </div>
    </div>
  );
}
