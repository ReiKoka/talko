import { useRef } from "react";
import { IoSend } from "react-icons/io5";
import Button from "./Button";

function Textarea({ id, value, onChange }) {
  const textareaRef = useRef(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className="flex w-full gap-4">
      <label htmlFor={id} className="hidden"></label>
      <textarea
        id={id}
        ref={textareaRef}
        rows={1}
        onInput={adjustHeight}
        className="border-secondary block h-auto w-full resize-none overflow-hidden rounded-md border px-3 pt-2 outline-0"
        placeholder="Type message..."
        value={value}
        onChange={onChange}
      />
      <Button title="Send message" type="submit" variant="icon">
        <IoSend className="fill-primary h-6 w-6" />
      </Button>
    </div>
  );
}

export default Textarea;
