import {IResponse} from "@/interfaces/shared/IResponse";

const PATHREQ = 'http://localhost:5000/api';

export async function createProduct(Product: any): Promise<IResponse> {
	const res = await fetch(`${PATHREQ}/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'cache': 'no-store'
		},
		body: JSON.stringify(Product),
	});
	const data = await res.json();
	return data;
}

export async function getProducts(): Promise<IResponse> {
	const res = await fetch(`${PATHREQ}/products`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'cache': 'no-store'
		},
	});
	const data = await res.json();
	return data;
}
