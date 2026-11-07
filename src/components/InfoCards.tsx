"use client";

import { useState } from "react";
import { numberCitations } from "./Claims";
import { Icon } from "./ui";

const CARDS = [
  {
    id: "video",
    kicker: "Myth check",
    title: "Memory isn't a video recording.",
    summary: "Misleading information after an event can change what people remember, even making them confident about things that never happened.",
    claimId: "psy-misinformation",
  },
  {
    id: "flashbulb",
    kicker: "Myth check",
    title: "Vivid doesn't mean accurate.",
    summary: "Memories of shocking news changed as much as everyday memories over time. Only confidence stayed high.",
    claimId: "psy-flashbulb",
  },
  {
    id: "multitasking",
    kicker: "Myth check",
    title: "Multitasking is really switching.",
    summary: "Right after switching tasks, people are slower and make more errors. Preparing helps, but the cost remains.",
    claimId: "psy-switch-cost",
  },
  {
    id: "left-right",
    kicker: "Myth check",
    title: "No one is “left-brained”.",
    summary: "In scans of over 1,000 people, left–right differences belonged to particular connections, not to whole people.",
    claimId: "myth-left-right",
  },
] as const;

/** Compact "good to know" carousel shown near the right edge (replaces the reference's promo card). */
export function InfoCards() {
  const [index, setIndex] = useState(0);
  const card = CARDS[index]!;
  const { list } = numberCitations([card.claimId]);

  return (
    <section aria-roledescription="carousel" aria-label="Good to know" className="glass-strong rounded-[var(--radius-glass)] p-4 xl:p-5">
      <div className="mb-3 flex items-center justify-between">
        <p className="eyebrow">{card.kicker}</p>
        <span className="text-[0.75rem] text-muted" aria-hidden="true">{index + 1}/{CARDS.length}</span>
      </div>
      <div aria-live="polite" aria-atomic="true" key={card.id} className="panel-enter">
        <h2 className="text-[1.0625rem] font-semibold uppercase italic leading-tight tracking-[-0.01em] text-ink">{card.title}</h2>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-ink-soft">{card.summary}</p>
        {list.length > 0 && (
          <p className="mt-2 text-[0.75rem] leading-snug text-muted">
            Source:{" "}
            {list.map((c, i) => (
              <span key={c.id}>
                {i > 0 && "; "}
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-medium text-teal-strong underline-offset-2 hover:underline">
                  {c.sourceType === "educational" ? c.publisher : c.authors.split(" ")[0]}
                  {c.year ? ` ${c.year}` : ""}
                  <span className="sr-only"> — {c.title} (opens in a new tab)</span>
                </a>
              </span>
            ))}
          </p>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex gap-1.5" role="group" aria-label="Choose card">
          {CARDS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Card ${i + 1}: ${c.title}`}
              aria-current={i === index}
              className="grid size-6 place-items-center rounded-full"
            >
              <span className={`block rounded-full transition-all ${i === index ? "h-2 w-5 bg-ink" : "size-2 bg-ink/25"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button type="button" onClick={() => setIndex((index - 1 + CARDS.length) % CARDS.length)} className="grid size-9 place-items-center rounded-full hover:bg-white/80" aria-label="Previous card">
            <Icon.ArrowLeft width={16} height={16} />
          </button>
          <button type="button" onClick={() => setIndex((index + 1) % CARDS.length)} className="grid size-9 place-items-center rounded-full hover:bg-white/80" aria-label="Next card">
            <Icon.ArrowRight width={16} height={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
