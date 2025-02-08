import {IResponse} from "@/interfaces/shared/IResponse";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!BACKEND_URL) {
	throw new Error("BACKEND_URL is not defined in environment variables");
}

const request = async (
	collection: string,
	endpoint: string = "",
	method: "GET" | "POST" | "PATCH" | "DELETE",
	body?: unknown
): Promise<IResponse> => {
	try {
		const res = await fetch(`${BACKEND_URL}/api/${collection}${endpoint}`, {
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

		return await res.json();
	} catch (error) {
		return {
			status: false,
			message: error instanceof Error ? error.message : "Error desconocido",
			response: undefined,
		};
	}
};

export const apiService = {
	create: <T>(collection: string, data: T) => request(collection, "", "POST", data),
	getAll: (collection: string) => request(collection, "", "GET"),
	getById: (collection: string, id: string | number) => request(collection, `/${id}`, "GET"),
	update: <T>(collection: string, id: string | number, data: T) =>
		request(collection, `/${id}`, "PATCH", data),
	delete: (collection: string, id: string | number) => request(collection, `/${id}`, "DELETE"),
};
