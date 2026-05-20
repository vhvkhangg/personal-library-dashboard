export type CurrentUser = {
  id: string;
  username: string;
  email: string | null;
  phone: string | null;
  displayName: string;
  createdAt: string;
  lastLoginAt: string | null;
};

export type AuthSession = {
  user: CurrentUser;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  authenticated: boolean;
};

export type ApiResponse<T> = {
  data: T;
  meta?: Record<string, unknown>;
};

export type ApiErrorResponse = {
  error?: {
    code?: string;
    message?: string;
    details?: Array<{ field?: string; message?: string }>;
  };
};

export type LoginInput = {
  identifier: string;
  password: string;
};

const DEFAULT_API_BASE_URL = "http://localhost:8080";

export function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_PLD_API_BASE_URL ?? DEFAULT_API_BASE_URL;
}

function buildApiUrl(path: string) {
  const base = getApiBaseUrl().replace(/\/$/u, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

function getErrorMessage(payload: unknown, fallback: string) {
  const maybeError = payload as ApiErrorResponse | null;
  return maybeError?.error?.message ?? fallback;
}

async function requestJson<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const text = await response.text();
  const payload = text ? (JSON.parse(text) as unknown) : null;

  if (!response.ok) {
    throw new Error(getErrorMessage(payload, `Request failed with status ${response.status}.`));
  }

  return payload as T;
}

export async function loginRequest(input: LoginInput) {
  const response = await requestJson<ApiResponse<AuthSession>>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });

  return response.data;
}

export async function refreshRequest() {
  const response = await requestJson<ApiResponse<AuthSession>>("/auth/refresh", {
    method: "POST",
  });

  return response.data;
}

export async function logoutRequest() {
  await requestJson<ApiResponse<{ loggedOut: boolean }>>("/auth/logout", {
    method: "POST",
  });
}

export async function meRequest() {
  const response = await requestJson<ApiResponse<CurrentUser>>("/auth/me", {
    method: "GET",
  });

  return response.data;
}
