import {IResponse} from "@/interfaces/shared/IResponse";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
	throw new Error("La variable de entorno NEXT_PUBLIC_BACKEND_URL no está definida");
}

const request = async <T = unknown>(
	collection: string,
	endpoint: string = "",
	method: "GET" | "POST" | "PATCH" | "DELETE",
	body?: unknown
): Promise<IResponse<T>> => {
	try {
		const url = `${BACKEND_URL}/api/${collection}${endpoint}`;
		const res = await fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
				"cache": "no-store",
			},
			body: body ? JSON.stringify(body) : undefined,
		});

		if (!res.ok) {
			const errorData = await res.json();
			throw new Error(errorData.message || "Ocurrió un error inesperado");
		}

		const data: IResponse<T> = await res.json();
		return data;
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : "Error desconocido",
			response: undefined as unknown as T,
		};
	}
};


export const apiService = {
	create: async <T, R = unknown>(collection: string, data: T): Promise<IResponse<R>> =>
		request(collection, "", "POST", data),

	getAll: async <T = unknown>(collection: string): Promise<IResponse<T>> =>
		request(collection, "", "GET"),

	getById: async <T = unknown>(collection: string, id: string | number): Promise<IResponse<T>> =>
		request(collection, `/${id}`, "GET"),

	update: async <T, R = unknown>(collection: string, id: string | number, data: T): Promise<IResponse<R>> =>
		request(collection, `/${id}`, "PATCH", data),

	delete: async <R = unknown>(collection: string, id: string | number): Promise<IResponse<R>> =>
		request(collection, `/${id}`, "DELETE"),
};
