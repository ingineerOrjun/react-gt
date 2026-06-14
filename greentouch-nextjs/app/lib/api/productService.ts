import axios from './axios';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  features: string[];
  specifications: Record<string, string>;
  relatedProducts: string[];
  createdAt: string;
  updatedAt: string;
}

interface CreateProductData {
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  category: string;
  features: string[];
  specifications: Record<string, string>;
  relatedProducts?: string[];
}

interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

export const getProducts = async (params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}): Promise<{ products: Product[]; total: number; pages: number }> => {
  const response = await axios.get('/products', { params });
  return response.data;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
  const response = await axios.get(`/products/${slug}`);
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await axios.get(`/products/id/${id}`);
  return response.data;
};

export const createProduct = async (data: CreateProductData): Promise<Product> => {
  const response = await axios.post('/admin/products', data);
  return response.data;
};

export const updateProduct = async (data: UpdateProductData): Promise<Product> => {
  const response = await axios.put(`/admin/products/${data.id}`, data);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<void> => {
  await axios.delete(`/admin/products/${id}`);
};

export const getProductCategories = async (): Promise<string[]> => {
  const response = await axios.get('/products/categories');
  return response.data;
}; 