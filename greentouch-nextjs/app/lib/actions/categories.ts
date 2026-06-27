'use server';

import { saveResource, toggleResource, deleteResource, duplicateResource, bulkSetPublished, bulkDelete } from '../admin/crud';
import { categoriesResource } from '../admin/resources';
import type { ActionState } from '../../components/admin/ui/types';

export async function saveCategory(prev: ActionState, fd: FormData): Promise<ActionState> {
  return saveResource(categoriesResource, prev, fd);
}
export async function toggleCategory(id: string, published: boolean): Promise<ActionState> {
  return toggleResource(categoriesResource, id, published);
}
export async function deleteCategory(id: string): Promise<ActionState> {
  return deleteResource(categoriesResource, id);
}
export async function duplicateCategory(id: string): Promise<ActionState> {
  return duplicateResource(categoriesResource, id);
}
export async function bulkPublishCategories(ids: string[], published: boolean): Promise<ActionState> {
  return bulkSetPublished(categoriesResource, ids, published);
}
export async function bulkDeleteCategories(ids: string[]): Promise<ActionState> {
  return bulkDelete(categoriesResource, ids);
}
