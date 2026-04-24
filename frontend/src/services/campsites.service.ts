import type { Campsite, PaginatedResponse } from '@/types';
import { request } from './http-client';

export const campsitesApi = {
  list: (params?: { organizationId?: string; status?: 'active' | 'inactive' }) => {
    const qs = new URLSearchParams();
    if (params?.organizationId) qs.set('organizationId', params.organizationId);
    if (params?.status) qs.set('status', params.status);
    const query = qs.toString();

    return request<PaginatedResponse<Campsite>>(
      `/campsites${query ? `?${query}` : ''}`,
    );
  },
  get: (id: string) => request<Campsite>(`/campsites/${id}`),
  create: (data: Partial<Campsite> & { organizationId: string }) =>
    request<Campsite>('/campsites', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<Campsite>) =>
    request<Campsite>(`/campsites/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  remove: (id: string) => request<void>(`/campsites/${id}`, { method: 'DELETE' }),
};
