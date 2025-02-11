import { Outlet } from "react-router";
import Nav from "../components/Nav";

function AppLayout() {
  return (
    <main className="bg-background relative flex h-dvh w-dvw items-center justify-center p-0 lg:p-8">
      <div className="bg-primary absolute top-0 left-0 z-0 hidden h-32 w-full lg:block"></div>
      <div className="bg-muted shadow-custom z-10 grid h-full w-full max-w-[1600px] grid-cols-1 grid-rows-[1fr_60px_0px] rounded-lg lg:grid-cols-[80px_1fr_2fr] lg:grid-rows-1">
        <Nav />
        <section className="row-start-1 p-2 font-primary">
          <Outlet />
        </section>
        <section className="hidden lg:block">
          
        </section>
      </div>
    </main>
  );
}

export default AppLayout;
