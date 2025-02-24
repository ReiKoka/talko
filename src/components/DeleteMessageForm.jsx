import Button from "./ui/Button";
import UndrawThrowAway from "../assets/undraw_throw-away.svg?react";

function DeleteMessageForm({ onSubmit, onCancel }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <UndrawThrowAway className="mx-auto h-40 w-40" />
      <h4 className="flex flex-col text-center text-lg font-medium">
        <span>Are you sure you want to unsent this message?</span>
        <span>This action cannot be undone?</span>
      </h4>
      <div className="flex items-center justify-end gap-4">
        <Button variant="secondary" type="reset" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Delete
        </Button>
      </div>
    </form>
  );
}

export default DeleteMessageForm;
