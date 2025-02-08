import {IProduct} from "@/interfaces/schemas/IProduct";
import {IResponse} from "@/interfaces/shared/IResponse";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createProduct(Product: IProduct): Promise<IResponse> {
	const res = await fetch(`${BACKEND_URL}/api/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'cache': 'no-store'
		},
		body: JSON.stringify(Product),
	});
	return await res.json();
}

export async function getProducts(): Promise<IResponse> {
	const res = await fetch(`${BACKEND_URL}/api/products`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'cache': 'no-store'
		},
	});
	return await res.json();
}

export async function getProduct(id: number): Promise<IResponse> {
	const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'cache': 'no-store'
		},
	});

	return await res.json();
}

export async function updateProduct(id: number, newProduct: IProduct): Promise<IResponse> {
	const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'cache': 'no-store'
		},
		body: JSON.stringify(newProduct),
	});
	return await res.json();
}

export async function removeProduct(id: number): Promise<IResponse> {
	const res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'cache': 'no-store'
		},
	});
	return await res.json();
}