import { PagesWrapper } from "@/components/shared/wrapper/wrapper";

function HomePage() {
  const menuBreadcrumb = [
    {
      name: "Inicio",
      href: "/",
    },
  ];

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center m-4 ">
        <h1 className="mb-4 text-4xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-5xl lg:text-6xl">
          Hola, esto es Organniza
        </h1>
      </div>
      {/* <h2 className="text-2xl font-bold">Hola, esto es Organniza</h2>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
    </PagesWrapper>
  );
}

export default HomePage;
