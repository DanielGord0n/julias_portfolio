import { about } from "@/lib/about";

export function SkillBars() {
  return (
    <ul className="space-y-3.5">
      {about.skills.map((skill) => (
        <li key={skill.name} className="flex items-center justify-between gap-6">
          <span className="text-[0.95rem] text-ink-soft">{skill.name}</span>
          <span className="flex shrink-0 gap-1.5" aria-label={`${skill.level} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`h-2.5 w-2.5 ${
                  i < skill.level ? "bg-accent" : "border border-line bg-transparent"
                }`}
              />
            ))}
          </span>
        </li>
      ))}
    </ul>
  );
}
