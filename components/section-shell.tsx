import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  number: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  className?: string;
  numberClassName?: string;
};

export function SectionShell({ id, number, eyebrow, title, children, className = "", numberClassName = "text-[#8bb3ff]" }: SectionShellProps) {
  return (
    <section id={id} className={`scroll-mt-24 border-t border-white/10 px-5 py-24 sm:px-8 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[.38fr_1fr]">
          <div className="flex items-start gap-4 text-sm font-bold uppercase tracking-[.18em] text-[#7f9bc7]">
            <span className={`font-mono ${numberClassName}`}>{number}</span>
            <span>{eyebrow}</span>
          </div>
          <div>
            <h2 className="font-display max-w-4xl text-4xl font-black leading-[.98] tracking-[-.055em] text-balance sm:text-6xl lg:text-7xl">
              {title}
            </h2>
            <div className="mt-10">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
