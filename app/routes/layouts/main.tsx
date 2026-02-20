import { Outlet } from "react-router";

function MainLayout() {
  return (
    <section className="max-w-6xl mx-auto px-6 my-8 text-white">
      <Outlet />
    </section>
  );
}

export default MainLayout;
