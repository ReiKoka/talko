import Topography from "/src/assets/topography.svg?react";


function Messages() {
  return (
    <section className="bg-background dark:bg-secondary hidden lg:block lg:rounded-tr-lg lg:rounded-br-lg">
      <div className="relative h-full w-full bg-transparent">
        <Topography className="fill-muted h-auto w-full" />

      </div>
    </section>
  );
}

export default Messages;
