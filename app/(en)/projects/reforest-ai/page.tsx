import type { Metadata } from "next";
import Image from "next/image";
import content from "@/content/reforest.json";
import { ArrowOutIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Reforest AI",
  description:
    "Forest monitoring and carbon sequestration in Paraguay's Chaco: CNN classification of satellite imagery, then NDVI-based change prediction.",
  alternates: { canonical: "/projects/reforest-ai/" },
};

type Block = { t: string; text?: string; src?: string; file?: string };
type Section = { id: string; blocks: Block[] };

const LABELS: Record<string, string> = {
  introduction: "Introduction",
  "phase-1": "Phase 1",
  "phase-2": "Phase 2",
};

/** Group consecutive images into one figure row. */
function group(blocks: Block[]) {
  const out: (Block | Block[])[] = [];
  for (const b of blocks) {
    const prev = out[out.length - 1];
    if (b.t === "img" && Array.isArray(prev)) prev.push(b);
    else if (b.t === "img") out.push([b]);
    else out.push(b);
  }
  return out;
}

export default function ReforestPage() {
  const sections = content as Section[];
  const title = sections[0]?.blocks.find((b) => b.t === "h1")?.text ?? "Reforest AI";

  return (
    <main className="case subpage">
      <a className="text-link case-back" href="/#works">
        ← Back to the works
      </a>
      <h1 className="case-title">{title}</h1>
      <p className="lede">
        Reforest AI: tracking deforestation in Paraguay&apos;s Chaco with satellite imagery, and finding where reforestation would
        capture the most carbon.
      </p>
      <nav className="case-nav" aria-label="Sections">
        {sections.map((s) => (
          <a key={s.id} className="text-link" href={`#${s.id}`}>
            {LABELS[s.id] ?? s.id}
          </a>
        ))}
        <a className="text-link" href="https://github.com/chocoff/reforest-ai" target="_blank" rel="noopener noreferrer">
          Source <ArrowOutIcon />
        </a>
      </nav>

      {sections.map((s, si) => (
        <section key={s.id} id={s.id} className="case-section" aria-label={LABELS[s.id]}>
          {group(si === 0 ? s.blocks.filter((b) => b.t !== "h1") : s.blocks).map((b, i) => {
            if (Array.isArray(b)) {
              return (
                <div className="case-figures" key={i}>
                  {b.map((img) => (
                    <Image key={img.src} src={img.src!} alt="" width={1200} height={800} sizes="(max-width: 900px) 100vw, 860px" />
                  ))}
                </div>
              );
            }
            if (b.t === "h1" || b.t === "h2") return <h2 key={i}>{b.text}</h2>;
            if (b.t === "h3") return <h3 key={i}>{b.text}</h3>;
            return <p key={i}>{b.text}</p>;
          })}
        </section>
      ))}
    </main>
  );
}
