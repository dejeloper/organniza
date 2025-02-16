import {IResponse} from "@/interfaces/shared/IResponse";
import {supabase} from "@/lib/supabaseClient";

const handleError = (error: any): IResponse<null> => {
	console.error("Error en API:", error);
	return {
		status: false,
		message: error.message || "Ocurrió un error inesperado",
		response: null,
	};
};

export const apiService = {
	create: async <T, R = unknown>(collection: string, data: T): Promise<IResponse<R>> => {
		const {data: response, error} = await supabase.from(collection).insert(data).select().single();
		return error ? handleError(error) : {status: true, message: "Creado exitosamente", response};
	},

	getAll: async <T = unknown>(collection: string): Promise<IResponse<T[]>> => {
		const {data, error} = await supabase.from(collection).select("*").order("createdAt", {ascending: false});
		return error ? handleError(error) : {status: true, message: "Datos obtenidos", response: data};
	},

	getById: async <T = unknown>(collection: string, id: string | number): Promise<IResponse<T>> => {
		const {data, error} = await supabase.from(collection).select("*").eq("id", id).single();
		return error ? handleError(error) : {status: true, message: "Registro encontrado", response: data};
	},

	update: async <T, R = unknown>(collection: string, id: string | number, data: T): Promise<IResponse<R>> => {
		const {data: updatedData, error} = await supabase.from(collection).update(data).eq("id", id).select().single();
		return error ? handleError(error) : {status: true, message: "Actualizado correctamente", response: updatedData};
	},

	delete: async <R = unknown>(collection: string, id: string | number): Promise<IResponse<R>> => {
		const {data, error} = await supabase.from(collection).delete().eq("id", id).select().single();
		return error ? handleError(error) : {status: true, message: "Eliminado correctamente", response: data};
	},
};
