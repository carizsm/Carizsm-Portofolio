import { skillGroups } from "@/content/skills";

export function Skills() {
  const count = skillGroups.reduce((sum, group) => sum + group.items.length, 0);
  return <details id="skills" className="story-explore-panel all-tools">
    <summary><span>Toolkit</span><span className="eyebrow">{count} tools & skills</span></summary>
    <div>{skillGroups.map(group => <section key={group.label}><h3 className="eyebrow">{group.label}</h3><ul>{group.items.map(item => <li key={item.name}>{item.name}{item.detail && <small>{item.detail}</small>}</li>)}</ul></section>)}</div>
  </details>;
}
