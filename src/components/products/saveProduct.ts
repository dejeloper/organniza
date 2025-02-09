'use server';

import {revalidatePath} from 'next/cache';
import {apiService} from '@/services/apiServices';
import {IProduct} from '@/interfaces/schemas/IProduct';
import {ProductType} from '@/validators/products/new-form-validate';

export async function saveProduct(id: string | null, data: ProductType) {
	try {
		let responseProduct;

		if (id) {
			responseProduct = await apiService.update<Partial<IProduct>, IProduct>(
				'products',
				Number(id),
				data
			);
		} else {
			responseProduct = await apiService.create<IProduct, IProduct>(
				'products',
				data
			);
		}

		if (!responseProduct.status) {
			return {status: false, message: responseProduct.message, response: null};
		}

		revalidatePath('/products');
		return {status: true, message: 'Producto guardado con éxito', response: responseProduct.response};
	} catch (error) {
		return {status: false, message: 'Error en el servidor', response: null};
	}
}
