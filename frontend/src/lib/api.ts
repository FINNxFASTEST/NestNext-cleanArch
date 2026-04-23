const BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('kangtent_token');
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...init, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new ApiError(res.status, body?.message ?? res.statusText, body);
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : ({} as T);
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public body?: unknown,
  ) {
    super(message);
  }
}

// Auth
export const authApi = {
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    request<{ accessToken: string; tokenType: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  login: (data: { email: string; password: string }) =>
    request<{ accessToken: string; tokenType: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  me: () => request<{ userId: string; email: string; role: string; firstName?: string; lastName?: string }>('/users/me'),
};

// Campsites
export const campsitesApi = {
  list: () => request<import('@/types').Campsite[]>('/campsites'),
  get: (id: string) => request<import('@/types').Campsite>(`/campsites/${id}`),
};

// Bookings
export const bookingsApi = {
  create: (data: import('@/types').CreateBookingDto) =>
    request<import('@/types').Booking>('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  unavailableDates: (pitchId: string) =>
    request<string[]>(`/bookings/unavailable/${pitchId}`),
};
