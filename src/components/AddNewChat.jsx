import { HiArrowSmallLeft } from "react-icons/hi2";
import Button from "./ui/Button";
import Title from "./ui/Title";
import { useState } from "react";

import SearchInput from "./SearchInput";

import SingleContact from "./SingleContact";

function AddNewChat({ onClose, contacts }) {
  const [text, setText] = useState("");

  const handleSearch = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="bg-muted h-full w-full">
      <div className="px-2 py-2 lg:gap-4 lg:px-4 lg:py-4">
        <div className="flex items-center gap-2">
          <Button title="back" type="button" variant="icon" onClick={onClose}>
            <HiArrowSmallLeft className="hover:fill-primary fill-foreground h-6 w-6" />
          </Button>
          <Title title="New Chat" />
        </div>
        <SearchInput value={text} onChange={handleSearch} />
      </div>
      <div className="flex flex-col overflow-y-auto">
        {contacts?.map((contact) => (
          <SingleContact contact={contact} key={contact.id} />
        ))}
      </div>
    </div>
  );
}

export default AddNewChat;
