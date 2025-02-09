import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Organniza",
  description: "Bienvenido a Organniza, tu aplicación para organizar la vida.",
};

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
    </PagesWrapper>
  );
}

export default HomePage;
