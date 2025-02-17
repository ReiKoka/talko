import Sidebar from "../components/Sidebar";
import Messages from "../components/Messages";
import ChatsAndProfileContainer from "../components/ChatsAndProfileContainer";

function AppLayout() {
  return (
    <main className="bg-muted dark:bg-muted relative flex h-dvh w-dvw items-center justify-center p-0 lg:p-8">
      <div className="bg-primary absolute top-0 left-0 z-0 hidden h-32 w-full lg:block"></div>
      <div className="bg-muted shadow-light dark:shadow-dark z-10 grid h-full w-full max-w-[1600px] grid-cols-1 grid-rows-[1fr_60px_0px] rounded-lg lg:grid-cols-[80px_1fr_2fr] lg:grid-rows-1">
        <Sidebar />
        <ChatsAndProfileContainer />
        <Messages />
      </div>
    </main>
  );
}

export default AppLayout;
