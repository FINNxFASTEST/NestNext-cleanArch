import type { Organization } from '@/types';
import { request } from './http-client';

export const organizationsApi = {
  mine: () => request<Organization[]>('/organizations/mine'),
  create: (data: Partial<Organization>) =>
    request<Organization>('/organizations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  get: (id: string) => request<Organization>(`/organizations/${id}`),
  update: (id: string, data: Partial<Organization>) =>
    request<Organization>(`/organizations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  remove: (id: string) => request<void>(`/organizations/${id}`, { method: 'DELETE' }),
};
