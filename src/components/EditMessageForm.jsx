import { useState } from "react";
import Textarea from "./ui/Textarea";

function EditMessageForm({ initialContent, onSubmit }) {
  const [text, setText] = useState(initialContent);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e, text);
    }
  };

  return (
    <form onSubmit={(e) => onSubmit(e, text)} className="flex flex-col gap-4">
      <Textarea
        id="message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </form>
  );
}

export default EditMessageForm;
