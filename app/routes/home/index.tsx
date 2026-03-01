import type { Route } from "./+types/index";
import type { Project } from "~/types";
import type { PostMeta } from "~/types";
import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestBlogPosts from "~/components/LatestBlogPosts";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom website development" },
  ];
}

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[]; projects: Project[] }> {
  const url = new URL("/posts-meta.json", request.url);

  const [postRes, projectRes] = await Promise.all([
    fetch(url.href),
    fetch(`${import.meta.env.VITE_API_URL}/projects`),
  ]);

  if (!postRes.ok || !projectRes.ok)
    throw new Error("Failed to fetch posts or projects.");

  const [postData, projectData] = await Promise.all([
    postRes.json(),
    projectRes.json(),
  ]);

  return { posts: postData, projects: projectData };
}

function HomePage({ loaderData }: Route.ComponentProps) {
  const { posts, projects } = loaderData;

  return (
    <>
      <FeaturedProjects projects={projects} count={2} />
      <AboutPreview />
      <LatestBlogPosts posts={posts} />
    </>
  );
}

export default HomePage;
