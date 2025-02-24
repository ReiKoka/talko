import Input from "./ui/Input";

function ProfileNameForm({ fullName, setFullName }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-4 p-2 lg:p-4"
    >
      <Input
        id="fullName"
        label="Your name"
        type="text"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border-border rounded-none border-0 border-b px-1 focus-visible:border-b-2 focus-visible:ring-0"
        autocomplete="off"
      />
      <p className="font-primary text-muted-foreground px-4 text-center text-sm">
        This is not your ID or email address. This is how your name looks to
        other Talko accounts
      </p>
    </form>
  );
}

export default ProfileNameForm;
