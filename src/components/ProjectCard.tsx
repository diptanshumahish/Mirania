import Link from "next/link";
import Media from "./Media";
import { projectPlace, type Project } from "@/data/projects";

export default function ProjectCard({
  project,
  ratio = 4 / 3,
  sizes = "(max-width: 700px) 100vw, 50vw",
  priority = false,
}: {
  project: Project;
  ratio?: number;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Link href={`/projects/${project.slug}`} className="prcard zoom-parent">
      <Media
        src={project.cover}
        alt={`${project.client} office furnished by Mirania`}
        ratio={ratio}
        sizes={sizes}
        priority={priority}
        zoom
      />
      <div className="prcard__meta">
        <h3 className="h4 prcard__name">{project.client}</h3>
        <p className="mono-sm muted">
          {project.sector} · {projectPlace(project)}
        </p>
      </div>
    </Link>
  );
}
