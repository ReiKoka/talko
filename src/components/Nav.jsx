import Logo from "./Logo";
import NavLinks from "./NavLinks";

function Nav() {
  return (
    <section className="bg-background dark:bg-secondary lg:border-r-border row-start-2 flex h-full flex-col items-center gap-28 p-2 lg:row-start-1 lg:rounded-tl-lg lg:rounded-bl-lg lg:border-r-2 lg:p-4">
      <Logo />
      <NavLinks />
    </section>
  );
}

export default Nav;
