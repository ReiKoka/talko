export function applyTheme(theme) {
  const root = window.document.documentElement;

  root.classList.remove("light", "dark");

  const effectiveTheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;

  root.classList.add(effectiveTheme);
}
