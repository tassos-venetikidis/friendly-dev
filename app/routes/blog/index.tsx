import { useState } from "react";
import Pagination from "~/components/Pagination";
import PostFilter from "~/components/PostFilter";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types";
import PostCard from "~/components/PostCard";

export async function loader({
  request,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/posts-meta.json", request.url);
  const res = await fetch(url.href);
  if (!res.ok) throw new Error("Failed to fetch data");
  const data = await res.json();

  data.sort(
    (a: PostMeta, b: PostMeta) =>
      new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return { posts: data };
}

function BlogPage({ loaderData }: Route.ComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTerm, setFilterTerm] = useState("");

  const { posts } = loaderData;

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(filterTerm) ||
      post.excerpt.toLowerCase().includes(filterTerm),
  );

  // Pagination Calculations
  const postPerPage = 4;
  const totalPages = Math.ceil(filteredPosts.length / postPerPage);
  const indexOfFirst = currentPage * postPerPage - postPerPage;
  const indexOfLast = currentPage * postPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  function handleOnFilterInput(term: string) {
    setFilterTerm(term);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900">
        <h2 className="text-3xl font-bold mb-8">📝 Blog</h2>
        <PostFilter
          filterTerm={filterTerm}
          onFilterInput={handleOnFilterInput}
        />
        <div className="space-y-8">
          {!currentPosts.length ? (
            <p className="text-gray-400 text-center">No Posts Found</p>
          ) : (
            currentPosts.map((post) => <PostCard key={post.slug} post={post} />)
          )}
        </div>
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default BlogPage;
