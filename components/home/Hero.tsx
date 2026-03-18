import { siteConfig } from "@/site.config";

// ★ Replace with your Cloudinary profile photo URL once uploaded
const PROFILE_PHOTO = "https://www.figma.com/api/mcp/asset/ff0a0546-34e8-4534-aa97-82de6430d529";

export function Hero() {
  return (
    <section className="max-w-[1440px] mx-auto px-[72px] pb-16" style={{ paddingTop: "calc(var(--nav-height) + 4rem)" }}>

      {/* Profile photo with stacked card effect */}
      <div className="relative w-[116px] h-[143px] mb-10">
        {/* Back shadow card */}
        <div className="absolute left-[10px] top-0 w-[95px] h-[86px] bg-[rgba(37,37,37,0.8)] border border-dashed border-[#3b3b3b] rounded-[14.5px]" />
        {/* Middle card */}
        <div className="absolute left-[4px] top-[12px] w-[107px] h-[97px] bg-[#252525] border border-dashed border-[#3b3b3b] rounded-[16px]" />
        {/* Photo card */}
        <div className="absolute left-0 top-[24px] w-[116px] h-[118px] bg-[#1e1e1e] rounded-[20px] overflow-hidden">
          <div className="absolute w-[181px] h-[241px] left-[-33px] top-[-66px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PROFILE_PHOTO}
              alt={siteConfig.owner.name}
              className="absolute inset-0 max-w-none object-cover size-full pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Headline */}
      <h1 className="font-display font-normal text-[40px] text-[#d4d4d4] leading-[1.14] mb-6 max-w-[885px]">
        {siteConfig.owner.tagline}
      </h1>

      {/* Bio */}
      <p className="font-body font-light text-[16px] text-[#a3a3a3] leading-[1.73] tracking-[0.6px] mb-16 max-w-[885px]">
        {siteConfig.owner.bio}
      </p>

      {/* Section label */}
      <p className="font-mono font-light text-[14px] text-[#d4d4d4] tracking-[0.6px] leading-[1.73] uppercase">
        Selected Projects
      </p>

    </section>
  );
}
