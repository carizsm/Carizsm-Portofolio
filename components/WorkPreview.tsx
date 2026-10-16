"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useId, useState } from "react";
import type { Project } from "@/content/projects";
import { getWorkPreview } from "@/content/work-previews";
import { motionTokens } from "@/lib/motion-tokens";
import { usePortfolioMotion } from "./PortfolioMotion";
export function WorkPreview({project}:{project:Project}) {
  const [imageIndex,setImageIndex] = useState(0);
  const instanceId = useId();
  const { enabled } = usePortfolioMotion();
  const media = getWorkPreview(project.id);
  const image = media[Math.min(imageIndex,media.length-1)];
  if (!image) return null;
  return <div className="work-preview"><figure><div className="work-preview-image"><motion.div key={image.src} initial={false} animate={{opacity:enabled?[0.75,1]:1}} transition={{duration:enabled?motionTokens.duration.fast:0}}><Image src={image.src} alt={image.alt} fill sizes="(max-width:900px) 90vw, 760px" className="object-contain" /></motion.div></div><figcaption><span>{image.caption}</span><a href={image.src} target="_blank" rel="noopener noreferrer">Full image<ArrowUpRight size={14} aria-hidden /><span className="sr-only"> (opens in a new tab)</span></a></figcaption></figure>{media.length>1 && <div className="preview-view-controls" role="group" aria-label={project.title + " preview images"}>{media.map((item,index)=><button key={item.src} type="button" aria-pressed={imageIndex===index} onClick={()=>setImageIndex(index)}>{String(index+1).padStart(2,"0")}<span>{item.caption.split(" · ")[0]}</span>{imageIndex===index && <motion.i aria-hidden layoutId={"preview-"+instanceId} transition={{duration:enabled?motionTokens.duration.normal:0,ease:motionTokens.easing.smooth}} />}</button>)}</div>}</div>;
}
