import type {
  AuthResponse,
  Booking,
  Campsite,
  CreateBookingDto,
  Membership,
  MemberRole,
  Organization,
  PaginatedResponse,
  User,
  UserRole,
} from '@/types';

const RAW_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';
const BASE = RAW_BASE.replace(/\/$/, '');
const API_PREFIX = '/api/v1';

const TOKEN_KEY = 'kangtent_token';
const REFRESH_KEY = 'kangtent_refresh';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${API_PREFIX}${path}`, { ...init, headers });

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

function roleIdToName(id?: number | string | null): UserRole {
  switch (String(id)) {
    case '1':
      return 'admin';
    case '2':
      return 'host';
    case '3':
    default:
      return 'customer';
  }
}

export function mapAuthResponseToUser(res: AuthResponse): User {
  return {
    id: String(res.user.id),
    email: res.user.email,
    firstName: res.user.firstName ?? undefined,
    lastName: res.user.lastName ?? undefined,
    role: roleIdToName(res.user.role?.id),
  };
}

export function persistAuth(res: AuthResponse) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, res.token);
  localStorage.setItem(REFRESH_KEY, res.refreshToken);
  document.cookie = `${TOKEN_KEY}=${res.token}; path=/; SameSite=Lax`;
}

export function clearAuth() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
}

export type MeResponse = {
  id: string | number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role?: { id: number } | null;
};

export function mapMeResponseToUser(
  me: MeResponse,
  memberships: Membership[] = [],
): User {
  return {
    id: String(me.id),
    email: me.email,
    firstName: me.firstName ?? undefined,
    lastName: me.lastName ?? undefined,
    role: roleIdToName(me.role?.id),
    memberships: memberships.map((m) => ({
      organizationId: m.organizationId,
      memberRole: m.memberRole,
    })),
  };
}

export const authApi = {
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) =>
    request<AuthResponse>('/auth/email/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  login: (data: { email: string; password: string }) =>
    request<AuthResponse>('/auth/email/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  me: () => request<MeResponse>('/auth/me'),
  logout: () => request<void>('/auth/logout', { method: 'POST' }),
};

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
  remove: (id: string) =>
    request<void>(`/campsites/${id}`, { method: 'DELETE' }),
};

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
    return request<PaginatedResponse<Booking>>(
      `/bookings${query ? `?${query}` : ''}`,
    );
  },
  get: (id: string) => request<Booking>(`/bookings/${id}`),
  cancel: (id: string) =>
    request<Booking>(`/bookings/${id}/cancel`, { method: 'PATCH' }),
};

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
  remove: (id: string) =>
    request<void>(`/organizations/${id}`, { method: 'DELETE' }),
};

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
  remove: (id: string) =>
    request<void>(`/memberships/${id}`, { method: 'DELETE' }),
};
