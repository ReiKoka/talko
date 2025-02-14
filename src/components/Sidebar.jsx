import Logo from "./Logo";
import NavLinks from "./NavLinks";

function Sidebar() {
  return (
    <section className="bg-secondary lg:border-r-border row-start-2 flex h-full flex-col items-center justify-between gap-12 p-2 lg:row-start-1 lg:rounded-tl-lg lg:rounded-bl-lg lg:border-r-2 lg:p-4">
      <Logo />
      <NavLinks />
    </section>
  );
}

export default Sidebar;
