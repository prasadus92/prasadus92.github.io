import { useEffect, useRef, useState } from 'react';

/**
 * ProofStrip — animated proof-point grid for the homepage and blog hero.
 *
 * Mirrors the Luminik marketing-site island pattern: a small interactive
 * component that renders a Stripe-style ledger of public-safe credibility
 * proof points. Each point counts up on first viewport intersection. Numbers
 * stay locked to the public proof list (Aura $3.6M ARR, Mainteny $2.7M seed,
 * Mainteny first MVP solo in 3 months); strings come from props so they can
 * be reused across pages without duplicating values.
 */

export type ProofPoint = {
  label: string;
  value: string;
  numericValue?: number;
  prefix?: string;
  suffix?: string;
  caption: string;
};

type Props = {
  points: ProofPoint[];
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function CountUp({ from = 0, to, duration = 1200, prefix = '', suffix = '', formatter }: { from?: number; to: number; duration?: number; prefix?: string; suffix?: string; formatter?: (n: number) => string }) {
  const [value, setValue] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (!ref.current || started.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setValue(to);
      started.current = true;
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (!visible || started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const next = from + (to - from) * easeOutCubic(t);
        setValue(next);
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [from, to, duration]);

  const display = formatter ? formatter(value) : value.toFixed(0);
  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

export default function ProofStrip({ points }: Props) {
  return (
    <div className="proof-strip" role="list">
      {points.map((point) => (
        <article key={point.label} className="proof-strip-card card" role="listitem">
          <span className="proof-strip-label">{point.label}</span>
          <strong className="proof-strip-value">
            {typeof point.numericValue === 'number' ? (
              <CountUp
                to={point.numericValue}
                prefix={point.prefix}
                suffix={point.suffix}
                formatter={(n) => (Number.isInteger(point.numericValue) ? Math.round(n).toString() : n.toFixed(1))}
              />
            ) : (
              point.value
            )}
          </strong>
          <p className="proof-strip-caption">{point.caption}</p>
        </article>
      ))}
    </div>
  );
}
