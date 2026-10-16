"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { experiences, type Experience as ExperienceEntry } from "@/content/experience";
import { SectionHead, SectionShell } from "./Section";
import { motionTokens } from "@/lib/motion-tokens";
import { usePortfolioMotion } from "./PortfolioMotion";

type Organization = { org: string; roles: ExperienceEntry[] };
const organizations = experiences.reduce<Organization[]>((groups,role) => {
  const existing = groups.find(({org}) => org === role.org);
  if (existing) existing.roles.push(role);
  else groups.push({org:role.org,roles:[role]});
  return groups;
},[]);
const isCurrent = (organization:Organization) => organization.roles.some(({end}) => end === "Present");
const currentOrganizations = organizations.filter(isCurrent);
const earlierOrganizations = organizations.filter(organization => !isCurrent(organization));
const publicWork:Record<string,{href:string;label:string}> = {
  "community-service-goat": {href:"/projects/the-goat",label:"The Goat · field project"},
  "motiva-founder": {href:"/projects/motiva",label:"MOTIVA · product prototype"},
};

export function Experience() {
  return <SectionShell id="experience" className="portfolio-experience">
    <SectionHead index="03" label="Experience" title={<>Building with{" "}<em>a team.</em></>} />
    <div className="experience-organizations">
      <div className="experience-margin"><span className="studio-label">2023 — now</span><p>Development.{" "}<br />Research.{" "}<br />Community.</p></div>
      <div className="experience-records">
        {currentOrganizations.map(organization => <OrganizationRecord key={organization.org} organization={organization} />)}
        <details className="experience-history"><summary>Earlier experience<span>{earlierOrganizations.length} organizations</span></summary>
          {earlierOrganizations.map(organization => <OrganizationRecord key={organization.org} organization={organization} />)}
        </details>
      </div>
    </div>
  </SectionShell>;
}

function OrganizationRecord({organization}:{organization:Organization}) {
  const current = isCurrent(organization);
  const [expanded,setExpanded] = useState(current);
  const { enabled } = usePortfolioMotion();
  const index = organizations.indexOf(organization);
  const panelId = "organization-" + index;
  return <article className="experience-organization" data-current={current}>
    <button type="button" className="organization-toggle" aria-expanded={expanded} aria-controls={panelId} onClick={() => setExpanded(previous => !previous)}>
      <span className="organization-number">{String(index+1).padStart(2,"0")}</span>
      <span className="organization-summary"><strong>{organization.org}</strong><span>{organization.roles.map(({role}) => role).join(" + ")}</span></span>
      <span className="organization-period">{current && <i aria-hidden />}{current ? "Current" : organization.roles[0].start.split(" ")[1]}</span>
      <span aria-hidden>{expanded ? <Minus size={20} strokeWidth={1.3} /> : <Plus size={20} strokeWidth={1.3} />}</span>
    </button>
    <div id={panelId} hidden={!expanded}>
      {expanded && <motion.div initial={false} animate={enabled ? {y:[motionTokens.distance.small,0]} : {y:0}} transition={{duration:enabled ? motionTokens.duration.normal : 0,ease:motionTokens.easing.smooth}} className="organization-detail">
        {organization.roles.length>1 && <p className="organization-overlap studio-label">Concurrent frontend & backend roles</p>}
        <div className="organization-roles" data-parallel={organization.roles.length>1}>
          {organization.roles.map(role => <div key={role.id} className="organization-role">
            <p className="studio-label">{role.start} — {role.end}</p><h3>{role.role}</h3><p>{role.summary}</p>
            {publicWork[role.id] && <Link href={publicWork[role.id].href} className="studio-text-link">{publicWork[role.id].label}<ArrowUpRight size={15} aria-hidden /></Link>}
          </div>)}
        </div>
      </motion.div>}
    </div>
  </article>;
}
