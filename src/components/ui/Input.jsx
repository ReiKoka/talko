function Input({
  id,
  type = "text",
  label,
  placeholder = "",
  icon,
  value,
  onChange,
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="text-foreground mb-2 block text-sm font-medium"
      >
        {label}
      </label>
      <div className="group relative">
        <div className="text-muted-foreground group-focus-within:text-primary pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          className={`border-muted block w-full min-w-full rounded-lg border p-2.5 ${icon ? "ps-10" : ""} text-foreground focus-visible:border-primary focus-visible:ring-primary text-sm focus-visible:ring-1 focus-visible:outline-0`}
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
