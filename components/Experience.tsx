"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { experiences, type Experience as ExperienceEntry } from "@/content/experience";
import { SectionHead, SectionShell } from "./Section";
import { motionTokens, shouldAnimate, springs } from "@/lib/motion-tokens";

const organizations = experiences.reduce<{ org: string; roles: ExperienceEntry[] }[]>((groups, role) => {
  const existing = groups.find(({ org }) => org === role.org);
  if (existing) existing.roles.push(role);
  else groups.push({ org: role.org, roles: [role] });
  return groups;
}, []);

const publicWork: Record<string, { href: string; label: string }> = {
  "community-service-goat": { href: "/projects/the-goat", label: "The Goat · field project" },
  "motiva-founder": { href: "/projects/motiva", label: "MOTIVA · product prototype" },
};

export function Experience() {
  const [open, setOpen] = useState<string[]>([organizations[0].org]);
  const reduced = useReducedMotion();

  return (
    <SectionShell id="experience" className="!pt-8 sm:!pt-10">
      <SectionHead index="03" label="Experience" title="The teams behind my work." />
      <div className="experience-organizations">
        <div className="experience-margin"><span className="studio-label">2023 — now</span><p>Development, research, and community.</p><span className="experience-route" aria-hidden /></div>
        <div className="experience-records">
          {organizations.map((organization, index) => {
            const expanded = open.includes(organization.org);
            const current = organization.roles.some(({ end }) => end === "Present");
            const panelId = `organization-${index}`;
            return (
              <motion.article key={organization.org} layout={shouldAnimate(reduced) ? "position" : false} transition={springs.snappy} className="experience-organization" data-current={current}>
                <button type="button" className="organization-toggle" aria-expanded={expanded} aria-controls={panelId} onClick={() => setOpen((previous) => expanded ? previous.filter((org) => org !== organization.org) : [...previous, organization.org])}>
                  <span className="organization-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="organization-summary"><strong>{organization.org}</strong><span>{organization.roles.map(({ role }) => role).join(" + ")}</span></span>
                  <span className="organization-period">{current && <i aria-hidden />}{current ? "Current" : organization.roles[0].start.split(" ")[1]}</span>
                  <motion.span aria-hidden animate={{ rotate: shouldAnimate(reduced) && expanded ? 45 : 0 }} transition={{ duration: reduced ? 0 : motionTokens.duration.fast }}>
                    {reduced && expanded ? <Minus size={20} strokeWidth={1.3} /> : <Plus size={20} strokeWidth={1.3} />}
                  </motion.span>
                </button>
                <div id={panelId} hidden={!expanded}>
                  {expanded && <motion.div initial={{ opacity: 1 }} animate={shouldAnimate(reduced) ? { y: [motionTokens.distance.small, 0] } : { y: 0 }} transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }} className="organization-detail">
                    {organization.roles.length > 1 && <p className="organization-overlap studio-label">Two ongoing roles · one development team</p>}
                    <div className="organization-roles" data-parallel={organization.roles.length > 1}>
                      {organization.roles.map((role) => <div key={role.id} className="organization-role">
                        <p className="studio-label">{role.start} — {role.end}</p>
                        <h3>{role.role}</h3>
                        <p>{role.summary}</p>
                        {publicWork[role.id] && <Link href={publicWork[role.id].href} className="studio-text-link">{publicWork[role.id].label}<ArrowUpRight size={15} aria-hidden /></Link>}
                      </div>)}
                    </div>
                  </motion.div>}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
