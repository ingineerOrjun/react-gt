'use server';

// Thin blog action wrappers binding the blogs config to the shared CRUD core
// (app/lib/admin/crud.ts). All logic lives in the core — no duplication.
import {
  saveResource,
  toggleResource,
  deleteResource,
  duplicateResource,
  bulkSetPublished,
  bulkDelete,
} from '../admin/crud';
import { blogsResource } from '../admin/resources';
import type { ActionState } from '../../components/admin/ui/types';

export type BlogFormState = ActionState;

export async function saveBlog(prev: ActionState, formData: FormData): Promise<ActionState> {
  return saveResource(blogsResource, prev, formData);
}

export async function toggleBlogPublished(id: string, published: boolean): Promise<ActionState> {
  return toggleResource(blogsResource, id, published);
}

export async function deleteBlog(id: string): Promise<ActionState> {
  return deleteResource(blogsResource, id);
}

export async function duplicateBlog(id: string): Promise<ActionState> {
  return duplicateResource(blogsResource, id);
}

export async function bulkPublishBlogs(ids: string[], published: boolean): Promise<ActionState> {
  return bulkSetPublished(blogsResource, ids, published);
}

export async function bulkDeleteBlogs(ids: string[]): Promise<ActionState> {
  return bulkDelete(blogsResource, ids);
}
