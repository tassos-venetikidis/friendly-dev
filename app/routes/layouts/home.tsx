import { Outlet } from "react-router";
import Hero from "~/components/Hero";

function HomeLayout() {
  return (
    <>
      <Hero name="Tassos" />
      <section className="max-w-6xl mx-auto px-6 my-8 text-white">
        <Outlet />
      </section>
    </>
  );
}

export default HomeLayout;
