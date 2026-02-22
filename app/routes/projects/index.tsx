import type { Route } from "./+types/index";
import type { Project } from "~/types";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const res = await fetch("http://localhost:8000/projects");
  const data = await res.json();

  return { projects: data };
}

function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData as { projects: Project[] };

  return (
    <>
      <h2 className="text-3xl font-bold mb-8">🚀 Projects</h2>
    </>
  );
}

export default ProjectsPage;
