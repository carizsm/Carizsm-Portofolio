"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { useId, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Project } from "@/content/projects";
import { getWorkPreview } from "@/content/work-previews";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { usePortfolioMotion } from "./PortfolioMotion";
export function WorkPreview({project}:{project:Project}) {
  const [imageIndex,setImageIndex] = useState(0);
  const instanceId = useId();
  const { enabled } = usePortfolioMotion();
  const media = getWorkPreview(project.id);
  const image = media[Math.min(imageIndex,media.length-1)];
  if (!image) return null;
  function handleViewKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.altKey || event.ctrlKey || event.metaKey || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const next = (index + (event.key === "ArrowRight" ? 1 : -1) + media.length) % media.length;
    setImageIndex(next);
    const controls = event.currentTarget.parentElement?.querySelectorAll("button");
    controls?.[next]?.focus({ preventScroll: true });
  }

  return <div className="work-preview">
    <figure>
      <div id={instanceId} className="work-preview-image">
        {media.map((item, index) => <motion.div key={item.src} aria-hidden={imageIndex !== index} initial={false} animate={{ opacity: imageIndex === index ? 1 : 0 }} transition={{ duration: enabled ? motionTokens.duration.normal : 0 }}>
          <Image src={item.src} alt={item.alt} fill sizes="(max-width:900px) 90vw, 760px" className="object-contain" />
        </motion.div>)}
      </div>
      <figcaption>{image.caption}</figcaption>
    </figure>
    {media.length > 1 && <div className="preview-view-controls" role="group" aria-label={project.title + " preview images"}>
      {media.map((item, index) => <button key={item.src} type="button" aria-pressed={imageIndex === index} aria-controls={instanceId} onClick={() => setImageIndex(index)} onKeyDown={event => handleViewKey(event, index)}>
        {String(index + 1).padStart(2, "0")}<span>{item.caption.split(" · ")[0]}</span>
        {imageIndex === index && <motion.i aria-hidden layoutId={"preview-" + instanceId} transition={enabled ? springs.snappy : { duration: 0 }} />}
      </button>)}
    </div>}
  </div>;
}
