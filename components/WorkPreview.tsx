"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useId, useState } from "react";
import type { Project } from "@/content/projects";
import { getWorkPreview } from "@/content/work-previews";
import { motionTokens, shouldAnimate } from "@/lib/motion-tokens";

export function WorkPreview({ project, compact = false }: { project: Project; compact?: boolean }) {
  const [imageIndex, setImageIndex] = useState(0);
  const instanceId = useId();
  const reduced = useReducedMotion();
  const media = getWorkPreview(project.id);
  const image = media[Math.min(imageIndex, media.length - 1)];

  return (
    <div className={`work-preview${compact ? " work-preview-compact" : ""}`}>
      <figure>
        <div className="work-preview-image">
          {image && <motion.div key={image.src} initial={{ opacity: 1 }} animate={{ opacity: [0.7, 1] }} transition={{ duration: motionTokens.duration.fast }}>
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 760px) 90vw, 580px" className="object-contain" />
          </motion.div>}
        </div>
        <figcaption>
          <span>{image?.caption}</span>
          {image && <a href={image.src} target="_blank" rel="noopener noreferrer">View image<ArrowUpRight size={13} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a>}
        </figcaption>
      </figure>
      {media.length > 1 && <div className="preview-view-controls" role="group" aria-label={`${project.title} preview images`}>
        {media.map((item, index) => <button key={item.src} type="button" aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)}>
          {index === 0 ? "01" : "02"}<span>{item.caption.split(" · ")[0]}</span>
          {imageIndex === index && <motion.i aria-hidden layoutId={`preview-${instanceId}`} transition={shouldAnimate(reduced) ? { duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth } : { duration: 0 }} />}
        </button>)}
      </div>}
      {!compact && <motion.div key={project.id} initial={{ opacity: 1 }} animate={shouldAnimate(reduced) ? { x: [motionTokens.distance.small, 0] } : { x: 0 }} transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }} className="work-preview-description">
        <p className="studio-label">{project.type}</p>
        <h4>{project.title}</h4>
        <p>{project.description}</p>
        <dl><dt>My contribution</dt><dd>{project.role}</dd></dl>
        <Link href={project.detailHref ?? `/projects/${project.id}`} className="studio-text-link">Explore {project.title}<ArrowUpRight size={17} aria-hidden /></Link>
      </motion.div>}
    </div>
  );
}
