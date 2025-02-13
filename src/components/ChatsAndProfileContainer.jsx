import { Outlet } from "react-router";

function ChatsAndProfileContainer() {
  return (
    <section className="font-primary row-start-1 py-2 lg:py-4 border-r-2 border-r-border">
      <Outlet />
    </section>
  );
}

export default ChatsAndProfileContainer;
