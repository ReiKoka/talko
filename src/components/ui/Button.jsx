function Button({ type = "button", variant, onClick, children }) {
  const baseStyles =
    "rounded-md px-4 py-2 text-sm font-medium focus-visible:ring-2 focus-visible:outline-none flex items-center gap-2 justify-center cursor-pointer transition duration-300 ease-in-out hover:translate-y-[-3px] w-full sm:w-fit";

  let buttonStyles = baseStyles;

  switch (variant) {
    case "primary":
      buttonStyles += `${baseStyles} bg-primary text-primary-foreground border-2 border-primary`;
      break;
    case "secondary":
      buttonStyles +=
        " bg-transparent text-secondary-foreground border-2 border-secondary-foreground hover:border-primary hover:text-primary";
      break;
    default:
      break;
  }

  return (
    <button type={type} className={buttonStyles} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
