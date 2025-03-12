import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { IPlace } from "@/interfaces/shared/IPlace";
interface PlaceProps {
  params: Promise<{ id: string }>;
}

import { Card, CardContent } from "@/components/ui/card";

import NewPlaceForm from "./new-place-form";

async function PlacesNewPage({ params }: PlaceProps) {
  const { id } = await params;
  const title = id ? "Editar Lugar" : "Crear Lugar";
  let Place: IPlace | undefined;

  const menuBreadcrumb: IBreadcrumbBar[] = [
    { name: "Inicio", href: "/" },
    { name: "Configuraciones", href: "/config" },
    { name: "Lugares", href: "#" },
  ];

  return (
    <PagesWrapper menuBreadcrumb={menuBreadcrumb}>
      <div className="flex flex-col justify-center m-4">
        <h3 className="mb-4 text-2xl font-extrabold text-center leading-none tracking-tight text-foreground md:text-3xl lg:text-4xl">
          {title}
        </h3>
        <div className="flex flex-col mx-auto w-full mt-4 md:mt-8">
          <Card className="w-full lg:w-1/2 md:w-3/4 sm:w-5/6 mx-auto border-0 shadow-form">
            <CardContent>
              <NewPlaceForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </PagesWrapper>
  );
}

export default PlacesNewPage;
