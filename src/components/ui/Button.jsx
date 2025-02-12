function Button({ title, type = "button", variant, onClick, children }) {
  const baseStyles =
    "text-sm font-medium focus-visible:ring-2 focus-visible:outline-none flex items-center gap-2 justify-center cursor-pointer transition-all duration-300 ease-out w-full sm:w-fit";

  let buttonStyles = baseStyles;

  switch (variant) {
    case "primary":
      buttonStyles = `${baseStyles} rounded-md px-4 py-2  bg-primary text-primary-foreground border-2 border-primary hover:translate-y-[-3px]`;
      break;
    case "secondary":
      buttonStyles = `${baseStyles} rounded-md px-4 py-2 bg-secondary text-secondary-foreground border-2 border-secondary hover:border-primary hover:translate-y-[-3px]`;
      break;
    case "icon":
      buttonStyles = `${baseStyles} aspect-square p-2 group`;
      break;
    default:
      break;
  }

  return (
    <button
      title={title}
      type={type}
      className={buttonStyles}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
