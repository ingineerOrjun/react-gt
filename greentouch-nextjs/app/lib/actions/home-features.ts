'use server';

import { saveResource, toggleResource, deleteResource, duplicateResource, bulkSetPublished, bulkDelete } from '../admin/crud';
import { featuresResource } from '../admin/resources';
import type { ActionState } from '../../components/admin/ui/types';

export async function saveFeature(prev: ActionState, fd: FormData): Promise<ActionState> {
  return saveResource(featuresResource, prev, fd);
}
export async function toggleFeature(id: string, published: boolean): Promise<ActionState> {
  return toggleResource(featuresResource, id, published);
}
export async function deleteFeature(id: string): Promise<ActionState> {
  return deleteResource(featuresResource, id);
}
export async function duplicateFeature(id: string): Promise<ActionState> {
  return duplicateResource(featuresResource, id);
}
export async function bulkPublishFeatures(ids: string[], published: boolean): Promise<ActionState> {
  return bulkSetPublished(featuresResource, ids, published);
}
export async function bulkDeleteFeatures(ids: string[]): Promise<ActionState> {
  return bulkDelete(featuresResource, ids);
}
