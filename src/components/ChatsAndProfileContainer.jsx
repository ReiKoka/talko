import { Outlet } from "react-router";

function ChatsAndProfileContainer() {
  return (
    <section className="font-primary border-r-border row-start-1 overflow-hidden border-r-2 flex flex-col">
      <Outlet />
    </section>
  );
}

export default ChatsAndProfileContainer;
