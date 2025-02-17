import clsx from "clsx";
import { twMerge } from "tailwind-merge";

function Input({
  id,
  type = "text",
  label,
  placeholder = "",
  icon,
  value,
  onChange,
  className,
  iconClassName
}) {
  const baseStyles =
    "border-muted block w-full min-w-full rounded-lg border p-2.5 text-foreground text-sm focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-1 focus-visible:outline-0";

  const baseIconStyles =
    "text-muted-foreground group-focus-within:text-primary pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5";

  const inputStyles = twMerge(clsx(baseStyles, icon && "ps-10", className));
  const iconStyles = twMerge(clsx(baseIconStyles, iconClassName));

  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="text-foreground mb-2 block text-sm font-medium"
      >
        {label}
      </label>
      <div className="group relative">
        {icon && <div className={clsx(iconStyles)}>{icon}</div>}
        <input
          type={type}
          id={id}
          className={inputStyles}
          placeholder={placeholder}
          autoComplete="on"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default Input;
