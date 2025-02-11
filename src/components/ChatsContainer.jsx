import { Outlet } from "react-router";

function ChatsContainer() {
  return (
    <section className="font-primary row-start-1 p-2">
      <Outlet />
    </section>
  );
}

export default ChatsContainer;
