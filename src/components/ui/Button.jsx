import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { forwardRef } from "react";

const Button = forwardRef(function Button({
  title,
  type = "button",
  variant,
  onClick,
  className,
  children,
}, ref) {
  const baseStyles =
    "text-sm font-medium focus-visible:ring-primary dark:focus-visible:ring-offset-muted focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none flex items-center gap-2 justify-center cursor-pointer transition-all duration-300 ease-out w-full sm:w-fit";

  const variantStyles = {
    primary:
      "rounded-md px-4 py-2 bg-primary text-primary-foreground border-2 border-primary hover:translate-y-[-3px]",
    secondary:
      "rounded-md px-4 py-2 bg-secondary text-secondary-foreground border-2 border-secondary hover:border-primary hover:translate-y-[-3px]",
    icon: "aspect-square p-2 group rounded-full ",
  };

  const buttonStyles = twMerge(
    clsx(baseStyles, variantStyles[variant], className),
  );

  return (
    <button
      ref={ref}
      title={title}
      type={type}
      className={buttonStyles}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;