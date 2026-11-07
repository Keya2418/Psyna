import type { ButtonHTMLAttributes, ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const Icon = {
  ArrowUpRight: (p: IconProps) => (<svg {...base} {...p}><path d="M7 17 17 7M9 7h8v8" /></svg>),
  ArrowRight: (p: IconProps) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  ArrowLeft: (p: IconProps) => (<svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>),
  Close: (p: IconProps) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>),
  Reset: (p: IconProps) => (<svg {...base} {...p}><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4h4" /></svg>),
  Layers: (p: IconProps) => (<svg {...base} {...p}><path d="m12 3 9 5-9 5-9-5 9-5z" /><path d="m3 13 9 5 9-5" /></svg>),
  Split: (p: IconProps) => (<svg {...base} {...p}><path d="M9 4v16M15 4v16M5 9l-2 3 2 3M19 9l2 3-2 3" /></svg>),
  Glass: (p: IconProps) => (<svg {...base} {...p}><circle cx="12" cy="12" r="8" /><path d="M8.5 9.5a4 4 0 0 1 3-2.2" /></svg>),
  Solid: (p: IconProps) => (<svg {...base} {...p}><circle cx="12" cy="12" r="8" fill="currentColor" stroke="none" /></svg>),
  Info: (p: IconProps) => (<svg {...base} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></svg>),
  Search: (p: IconProps) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>),
  Map: (p: IconProps) => (<svg {...base} {...p}><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></svg>),
  Cube: (p: IconProps) => (<svg {...base} {...p}><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></svg>),
  Check: (p: IconProps) => (<svg {...base} {...p}><path d="m5 12 4.5 4.5L19 7" /></svg>),
  Replay: (p: IconProps) => (<svg {...base} {...p}><path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5" /></svg>),
  External: (p: IconProps) => (<svg {...base} width={14} height={14} {...p}><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></svg>),
  Chevron: (p: IconProps) => (<svg {...base} {...p}><path d="m6 9 6 6 6-6" /></svg>),
};

export function Wordmark() {
  return (
    <span className="flex items-center gap-2.5 text-[1.1875rem] font-semibold tracking-[-0.02em] text-ink">
      <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="18" fill="#111a22" />
        <path d="M31 15c-8 0-14 6-14 13 0 3 1 5 2 7-2 2-2 5-1 7 2 4 7 6 13 6V15zm2 0c8 0 14 6 14 13 0 3-1 5-2 7 2 2 2 5 1 7-2 4-7 6-13 6V15z" fill="#bfe9e4" />
      </svg>
      Mind Atlas
    </span>
  );
}

type Variant = "primary" | "pill" | "ghost" | "dark";

export function Button({
  variant = "pill",
  className = "",
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; children: ReactNode }) {
  const styles: Record<Variant, string> = {
    primary:
      "bg-white/90 text-ink shadow-[0_8px_24px_-14px_rgb(26_48_66/0.6)] border border-white hover:bg-white pl-5 pr-1.5 py-1.5",
    pill: "glass-pill text-ink hover:bg-white/80 px-4 py-2",
    ghost: "text-ink hover:bg-white/60 px-3 py-2",
    dark: "bg-night text-white hover:bg-[#1d2a35] px-4 py-2",
  };
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-[0.9375rem] font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${styles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

/** Dark circular arrow used at the right edge of primary actions (as in the reference). */
export function ArrowDisc() {
  return (
    <span className="grid size-9 place-items-center rounded-full bg-night text-white">
      <Icon.ArrowUpRight width={16} height={16} />
    </span>
  );
}
