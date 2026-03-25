import type { ResearchCalloutBlock } from "@/lib/types";

export function ResearchCallout({ label = "KEY FINDINGS", items, body }: ResearchCalloutBlock) {
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
