
type Props = {
  heroImage:    string;
  title:        string;
  descriptor:   string;
  role:         string;
  timeline:     string;
  noNavOffset?: boolean;
};

export function CaseStudyHero({ heroImage, title, descriptor, role, timeline, noNavOffset }: Props) {
  return (
    <div style={noNavOffset ? {} : { paddingTop: "var(--nav-height)" }} className="pt-12 pb-0">
      <div className="max-w-reading mx-auto px-6">

        {/* OVERVIEW label + title */}
        <div className="flex flex-col gap-4">
          <p className="font-body text-[13px] text-[#737373] tracking-[0.6px] leading-[1.73] uppercase">
            Overview
          </p>
          <h1 className="font-display text-[36px] text-[#d4d4d4] leading-[1.4]">
            {title}
          </h1>
        </div>

        {/* Hero image */}
        <div className="mt-6 w-full overflow-hidden rounded-sm bg-[#1a1a1a]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImage}
            alt={title}
            className="w-full h-auto block"
          />
        </div>

        {/* Descriptor */}
        {descriptor && (
          <p className="mt-6 font-body text-[16px] text-[#a3a3a3] leading-[1.73] tracking-[0.3px]">
            {descriptor}
          </p>
        )}

        {/* MY ROLE + TIMELINE */}
        <div className="mt-8 flex flex-col gap-4">
          <p className="font-body text-[13px] text-[#737373] tracking-[0.6px] leading-[1.73] uppercase">
            My Role
          </p>
          <p className="font-body text-[16px] text-[#a3a3a3] leading-[1.73] tracking-[0.3px]">
            {role}
            {timeline && (
              <span className="ml-2 text-[#737373]">· {timeline}</span>
            )}
          </p>
        </div>

        {/* Divider before blocks */}
        <div className="mt-12 h-px bg-[#171717]" />
      </div>
    </div>
  );
}
