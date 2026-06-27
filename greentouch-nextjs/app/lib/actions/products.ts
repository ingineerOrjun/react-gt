'use server';

// Thin product action wrappers binding the products config to the shared CRUD
// core (app/lib/admin/crud.ts). All logic lives in the core — no duplication.
import {
  saveResource,
  toggleResource,
  deleteResource,
  duplicateResource,
  bulkSetPublished,
  bulkDelete,
} from '../admin/crud';
import { productsResource } from '../admin/resources';
import type { ActionState } from '../../components/admin/ui/types';

export type ProductFormState = ActionState;

export async function saveProduct(prev: ActionState, formData: FormData): Promise<ActionState> {
  return saveResource(productsResource, prev, formData);
}

export async function toggleProductPublished(id: string, published: boolean): Promise<ActionState> {
  return toggleResource(productsResource, id, published);
}

export async function deleteProduct(id: string): Promise<ActionState> {
  return deleteResource(productsResource, id);
}

export async function duplicateProduct(id: string): Promise<ActionState> {
  return duplicateResource(productsResource, id);
}

export async function bulkPublishProducts(ids: string[], published: boolean): Promise<ActionState> {
  return bulkSetPublished(productsResource, ids, published);
}

export async function bulkDeleteProducts(ids: string[]): Promise<ActionState> {
  return bulkDelete(productsResource, ids);
}
