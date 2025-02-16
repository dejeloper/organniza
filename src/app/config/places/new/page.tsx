import { Card, CardContent } from "@/components/ui/card";
import { PagesWrapper } from "@/components/shared/wrapper/wrapper";
import { IBreadcrumbBar } from "@/interfaces/shared/IBreadcrumb";
import { redirect } from "next/navigation";
import { apiService } from "@/services/apiServices";
import { Metadata } from "next";
import { IPlace } from "@/interfaces/shared/IPlace";
import NewPlaceForm from "@/components/config/places/new-place-form";
import { supabase } from "@/lib/supabaseClient";

export const metadata: Metadata = {
  title: "Crear Lugar | Organniza",
  description: "Bienvenido a Organniza, tu aplicación para organizar la vida.",
};

interface PlaceProps {
  params: Promise<{ id: string }>;
}

async function NewPlacePage({ params }: PlaceProps) {
  const { id } = await params;
  const title = id ? "Editar Lugar" : "Crear Lugar";
  let Place: IPlace | undefined;

  if (id) {
    try {
      const { data, error } = await supabase
        .from("Place")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error al obtener el Lugar:", error);
        redirect("/config/places");
      }

      Place = data;
    } catch (error) {
      console.error("Error inesperado al obtener el Lugar:", error);
      redirect("/config/places");
    }
  }

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
              <NewPlaceForm place={Place} />
            </CardContent>
          </Card>
        </div>
      </div>
    </PagesWrapper>
  );
}

export default NewPlacePage;
