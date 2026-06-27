'use server';

import { saveResource, toggleResource, deleteResource, duplicateResource, bulkSetPublished, bulkDelete } from '../admin/crud';
import { statisticsResource } from '../admin/resources';
import type { ActionState } from '../../components/admin/ui/types';

export async function saveStatistic(prev: ActionState, fd: FormData): Promise<ActionState> {
  return saveResource(statisticsResource, prev, fd);
}
export async function toggleStatistic(id: string, published: boolean): Promise<ActionState> {
  return toggleResource(statisticsResource, id, published);
}
export async function deleteStatistic(id: string): Promise<ActionState> {
  return deleteResource(statisticsResource, id);
}
export async function duplicateStatistic(id: string): Promise<ActionState> {
  return duplicateResource(statisticsResource, id);
}
export async function bulkPublishStatistics(ids: string[], published: boolean): Promise<ActionState> {
  return bulkSetPublished(statisticsResource, ids, published);
}
export async function bulkDeleteStatistics(ids: string[]): Promise<ActionState> {
  return bulkDelete(statisticsResource, ids);
}
