export function applyTheme(theme) {
  const root = window.document.documentElement;

  root.classList.remove("light", "dark");

  const effectiveTheme = theme;

  root.classList.add(effectiveTheme);
}
