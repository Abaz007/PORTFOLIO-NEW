import type { MentalModelsBlock } from "@/lib/types";

const icons: Record<string, React.ReactNode> = {
  variable_lock: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#262626"/>
      <path d="M10.5459 17.125H29.4531V26.3133C29.4531 26.6532 29.1775 26.9287 28.8377 26.9287H11.1613C10.8214 26.9287 10.5459 26.6532 10.5459 26.3133V17.125Z" fill="#A855F7"/>
      <rect x="9.8457" y="12.9238" width="20.3077" height="3.50133" rx="0.307692" fill="#A855F7"/>
      <path d="M19.6154 18.0365C19.6356 17.9151 19.7407 17.8262 19.8637 17.8262H20.1375C20.2605 17.8262 20.3656 17.9151 20.3858 18.0365L21.0021 21.7346C21.0277 21.8881 20.9094 22.0278 20.7538 22.0278H19.2474C19.0918 22.0278 18.9735 21.8881 18.9991 21.7346L19.6154 18.0365Z" fill="#A855F7"/>
      <path d="M20.3596 19.2051C20.4292 19.2052 20.4898 19.2541 20.5041 19.3223L21.468 23.9502C21.4871 24.0418 21.417 24.1279 21.3235 24.1279H18.6096C18.516 24.1279 18.446 24.0418 18.4651 23.9502L19.4289 19.3223C19.4433 19.2541 19.5037 19.2051 19.5735 19.2051H20.3596Z" fill="#E1EFFE"/>
    </svg>
  ),
  total_lock: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#262626"/>
      <path d="M21.5391 10.4609C23.2382 10.4612 24.6152 11.8389 24.6152 13.5381V19.6914H22.7695V13.5381C22.7695 12.8584 22.2178 12.3066 21.5381 12.3066H18.4619C17.7822 12.3066 17.2305 12.8584 17.2305 13.5381V19.6914H15.3848V13.5381C15.3848 11.8387 16.7626 10.4609 18.4619 10.4609H21.5391Z" fill="#FED7AA"/>
      <path d="M11.6924 19.6917C11.6924 19.012 12.2434 18.4609 12.9232 18.4609H27.077C27.7567 18.4609 28.3078 19.012 28.3078 19.6917V28.3071C28.3078 28.9868 27.7567 29.5379 27.077 29.5379H12.9232C12.2434 29.5379 11.6924 28.9868 11.6924 28.3071V19.6917Z" fill="#F97316"/>
    </svg>
  ),
  spending_control: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#262626"/>
      <path d="M10.4619 14.1527C10.4619 13.4729 11.013 12.9219 11.6927 12.9219H25.8466C26.5263 12.9219 27.0774 13.4729 27.0774 14.1527V23.9989C27.0774 24.6786 26.5263 25.2296 25.8466 25.2296H11.6927C11.013 25.2296 10.4619 24.6786 10.4619 23.9989V14.1527Z" fill="#A7F3D0"/>
      <path d="M12.3076 15.9984C12.3076 15.3186 12.8587 14.7676 13.5384 14.7676H27.6923C28.372 14.7676 28.9231 15.3186 28.9231 15.9984V25.8446C28.9231 26.5243 28.372 27.0753 27.6923 27.0753H13.5384C12.8587 27.0753 12.3076 26.5243 12.3076 25.8446V15.9984Z" fill="#10B981"/>
      <circle cx="26.4612" cy="20.9222" r="1.23078" fill="#E1EFFE"/>
    </svg>
  ),
};

export function MentalModels({ heading, items }: MentalModelsBlock) {
  return (
    <div className="flex flex-col gap-[30px]">
      <p className="font-display text-[36px] text-[#d4d4d4] leading-[1.4]">
        {heading}
      </p>

      <div className="flex flex-col gap-6">
        <div className="h-px bg-[#171717]" />

        <div className="flex flex-col gap-[30px]">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              {/* Real icon — includes its own 40×40 rounded dark background */}
              {icons[item.icon] ?? null}
              {/* Text */}
              <div className="flex flex-col gap-1">
                <p className="font-display text-[16px] text-[#e5e5e5] leading-[1.5]">
                  {item.label}
                </p>
                <p className="font-body font-light text-[16px] text-[#a3a3a3] leading-[1.73] tracking-[0.096px]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-px bg-[#171717]" />
      </div>
    </div>
  );
}
