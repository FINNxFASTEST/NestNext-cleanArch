import type { Booking, CreateBookingDto, PaginatedResponse } from '@/types';
import { request } from './http-client';

export const bookingsApi = {
  create: (data: CreateBookingDto) =>
    request<Booking>('/bookings', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  list: (params?: { organizationId?: string; status?: Booking['status'] }) => {
    const qs = new URLSearchParams();
    if (params?.organizationId) qs.set('organizationId', params.organizationId);
    if (params?.status) qs.set('status', params.status);
    const query = qs.toString();

    return request<PaginatedResponse<Booking>>(`/bookings${query ? `?${query}` : ''}`);
  },
  get: (id: string) => request<Booking>(`/bookings/${id}`),
  cancel: (id: string) => request<Booking>(`/bookings/${id}/cancel`, { method: 'PATCH' }),
};
