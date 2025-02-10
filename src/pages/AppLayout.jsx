function AppLayout() {
  return (
    <div className="bg-background relative flex h-dvh w-dvw items-center justify-center">
      <div className="bg-primary absolute top-0 left-0 z-0 h-32 w-full"></div>
      <div className="bg-muted grid-cols-[80px_1fr_2fr] z-10 grid h-[90%] w-full max-w-[1600px] rounded-lg"></div>
    </div>
  );
}

export default AppLayout;
