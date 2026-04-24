import type { Membership, MemberRole } from '@/types';
import { request } from './http-client';

export const membershipsApi = {
  listForOrg: (organizationId: string) =>
    request<Membership[]>(`/memberships?organizationId=${organizationId}`),
  myMemberships: () => request<Membership[]>('/memberships/me'),
  invite: (data: {
    organizationId: string;
    userId: string;
    memberRole: MemberRole;
  }) =>
    request<Membership>('/memberships/invite', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  remove: (id: string) => request<void>(`/memberships/${id}`, { method: 'DELETE' }),
};
