export function applyTheme(theme) {
  const root = window.document.documentElement;

  root.classList.remove("light", "dark");

  const effectiveTheme = theme === "light" ? "light" : "dark";

  root.classList.add(effectiveTheme);
}
