import type { ComparisonTableBlock } from "@/lib/types";

function ArrowDown({ color }: { color: string }) {
  return (
    <div className="flex h-[22px] items-center justify-center w-full shrink-0">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1.5V12.5M7 12.5L2.5 8M7 12.5L11.5 8" stroke={color} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function FlowTable({ left_header, right_header, rows }: ComparisonTableBlock) {
  return (
    <div className="w-full border border-[#262626] p-[14px]">
      <div className="flex flex-col sm:flex-row gap-[14px]">
        {/* Left column */}
        <div className="flex-1 flex flex-col gap-[3px]">
          <div className="border border-[#262626] h-[46px] flex items-center justify-center px-6 py-4">
            <span className="font-mono font-light text-[12px] text-[#a3a3a3] uppercase text-center leading-5">
              {left_header}
            </span>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {i > 0 && <ArrowDown color="#a3a3a3" />}
              <div className="border border-[#262626] min-h-[72px] flex items-center justify-center px-6 py-4">
                <span className="font-mono font-light text-[12px] text-[#a3a3a3] text-center leading-5">
                  {row.left}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Right column */}
        <div className="flex-1 flex flex-col gap-[3px]">
          <div className="border border-[#262626] h-[46px] flex items-center justify-center px-6 py-4">
            <span className="font-mono font-light text-[12px] text-[#4ade80] uppercase text-center leading-5">
              {right_header}
            </span>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="flex flex-col gap-[3px]">
              {i > 0 && <ArrowDown color="#4ade80" />}
              <div className="border border-[#262626] min-h-[72px] flex items-center justify-center px-6 py-4">
                <span className="font-mono font-light text-[12px] text-[#4ade80] text-center leading-5">
                  {row.right}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StandardTable({ left_header, right_header, rows }: ComparisonTableBlock) {
  return (
    <div className="w-full overflow-hidden border border-[#262626]">
      {/* Header */}
      <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-[#262626]">
        <div className="px-4 sm:px-6 py-3 h-11 flex items-center">
          <span className="font-mono font-light text-[12px] text-[#a3a3a3] leading-5">
            {left_header}
          </span>
        </div>
        <div className="px-4 sm:px-6 py-3 h-11 flex items-center sm:border-l border-t sm:border-t-0 border-[#262626]">
          <span className="font-mono font-light text-[12px] text-[#4ade80] leading-5">
            {right_header}
          </span>
        </div>
      </div>
      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={i}
          className={`grid grid-cols-1 sm:grid-cols-2${i < rows.length - 1 ? " border-b border-[#262626]" : ""}`}
        >
          <div className="px-4 sm:px-6 py-4 flex items-center">
            <span className="font-mono font-light text-[12px] text-[#a3a3a3] leading-5">
              {row.left}
            </span>
          </div>
          <div className="px-4 sm:px-6 py-4 flex items-center sm:border-l border-t sm:border-t-0 border-[#262626]">
            <span className="font-mono font-light text-[12px] text-[#4ade80] leading-5">
              {row.right}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ComparisonTable(props: ComparisonTableBlock) {
  if (props.variant === "flow") return <FlowTable {...props} />;
  return <StandardTable {...props} />;
}
