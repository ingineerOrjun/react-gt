'use server';

import { saveResource, toggleResource, deleteResource, duplicateResource, bulkSetPublished, bulkDelete } from '../admin/crud';
import { industriesResource } from '../admin/resources';
import type { ActionState } from '../../components/admin/ui/types';

export async function saveIndustry(prev: ActionState, fd: FormData): Promise<ActionState> {
  return saveResource(industriesResource, prev, fd);
}
export async function toggleIndustry(id: string, published: boolean): Promise<ActionState> {
  return toggleResource(industriesResource, id, published);
}
export async function deleteIndustry(id: string): Promise<ActionState> {
  return deleteResource(industriesResource, id);
}
export async function duplicateIndustry(id: string): Promise<ActionState> {
  return duplicateResource(industriesResource, id);
}
export async function bulkPublishIndustries(ids: string[], published: boolean): Promise<ActionState> {
  return bulkSetPublished(industriesResource, ids, published);
}
export async function bulkDeleteIndustries(ids: string[]): Promise<ActionState> {
  return bulkDelete(industriesResource, ids);
}
