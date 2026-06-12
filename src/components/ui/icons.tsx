import * as React from "react";
import { cn } from "@/lib/utils";

type IconProps = React.SVGProps<SVGSVGElement>;

function Svg({ className, children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-5 w-5 shrink-0", className)}
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconGlobe = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" />
  </Svg>
);

export const IconFlag = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 21V4" />
    <path d="M5 4h12l-2.2 3.5L17 11H5" />
  </Svg>
);

export const IconTag = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 4h7l9 9-7 7-9-9V4Z" />
    <circle cx="7.6" cy="7.6" r="1.3" />
  </Svg>
);

export const IconCap = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 4 2 9l10 5 10-5-10-5Z" />
    <path d="M6 11.5V16c0 1.3 2.7 2.2 6 2.2s6-.9 6-2.2v-4.5" />
    <path d="M22 9v4.5" />
  </Svg>
);

export const IconBuilding = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 21h18" />
    <path d="M5 21V7l7-3 7 3v14" />
    <path d="M9 21v-5h6v5" />
    <path d="M9 10h2M13 10h2" />
  </Svg>
);

export const IconCheckBadge = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8.5 12.5l2.4 2.4 4.6-5" />
  </Svg>
);

export const IconSparkle = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
    <path d="M19 14l.7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" />
  </Svg>
);

export const IconCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
);

export const IconArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 6h18" />
    <path d="M3 12h18" />
    <path d="M3 18h18" />
  </Svg>
);

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </Svg>
);

// Pass fill="currentColor" to render a solid star (e.g. filled ratings).
export const IconStar = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85L12 3.5Z" />
  </Svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M5 4h3l1.6 4-2 1.4a11 11 0 0 0 5 5l1.4-2 4 1.6v3a2 2 0 0 1-2.1 2A16 16 0 0 1 3 6.1 2 2 0 0 1 5 4Z" />
  </Svg>
);

export const IconWhatsApp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 11.5a8.5 8.5 0 0 1-12.4 7.55L3.5 20.5l1.5-4.9A8.5 8.5 0 1 1 21 11.5Z" />
    <path d="M8.8 9c-.2.5-.2 1.6.6 2.9a7.4 7.4 0 0 0 3 2.7c1 .4 1.8.3 2.3 0l.5-1.3-1.9-.9-.8.7c-.7-.4-1.4-1.1-1.8-1.8l.7-.8-.9-1.9L8.8 9Z" />
  </Svg>
);

export const IconShield = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 1.8" />
  </Svg>
);

export const IconTruck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 7h10v8H3z" />
    <path d="M13 10h4l3 3v2h-7z" />
    <circle cx="7" cy="17.5" r="1.6" />
    <circle cx="17" cy="17.5" r="1.6" />
  </Svg>
);

export const IconChevronDown = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 9l6 6 6-6" />
  </Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Z" />
    <path d="M3.5 7.5l8.5 6 8.5-6" />
  </Svg>
);

export const IconQuote = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9.5 8H7a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v.4A2.5 2.5 0 0 1 6.5 17" />
    <path d="M18.5 8H16a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v.4a2.5 2.5 0 0 1-2.5 2.6" />
  </Svg>
);

export const IconHome = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 11.5 12 4l8 7.5" />
    <path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
    <path d="M10 20v-5h4v5" />
  </Svg>
);

export const IconGrid = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </Svg>
);

export const IconLayers = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="M3 13l9 5 9-5" />
  </Svg>
);
