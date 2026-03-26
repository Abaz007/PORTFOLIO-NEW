import type { PersonaColumnsBlock } from "@/lib/types";

export function PersonaColumns({ columns }: PersonaColumnsBlock) {
  return (
    <div className="w-full flex gap-6">
      {columns.map((col, i) => (
        <div key={i} className="flex-1 flex flex-col gap-1">
          {/* Label cell */}
          <div className="border border-[#262626] px-6 py-4">
            <span className="font-mono font-extralight text-[12px] text-[#a3a3a3] uppercase leading-5">
              {col.label}
            </span>
          </div>
          {/* Name + body cell — flex-1 so both columns reach the same total height */}
          <div className="flex-1 border border-[#262626] px-6 py-4 flex flex-col gap-4">
            <p className="font-body font-bold text-[12px] text-[#a3a3a3] leading-5">
              {col.name}
            </p>
            <p className="font-body font-light text-[12px] text-[#a3a3a3] leading-5">
              {col.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
