import { HiMagnifyingGlassCircle } from "react-icons/hi2";
import Input from "./ui/Input";

const SearchInput = ({
  id = "search",
  value,
  onChange,
  placeholder = "Search",
  className = "",
  iconClassName = "",
}) => {
  return (
    <Input
      id={id}
      placeholder={placeholder}
      icon={<HiMagnifyingGlassCircle className="h-7 w-7" />}
      value={value}
      onChange={onChange}
      className={`border-border border-2 ${className}`}
      iconClassName={`ps-1.5 ${iconClassName}`}
    />
  );
};

export default SearchInput;
