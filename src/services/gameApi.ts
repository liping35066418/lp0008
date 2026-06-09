import type {
  Choice,
  GameStats,
  PlayResponse,
  ResetResponse,
} from '../../shared/types';

const API_BASE = '/api';

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error((error as { error?: string }).error || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function playGame(playerChoice: Choice): Promise<PlayResponse> {
  return request<PlayResponse>('/play', {
    method: 'POST',
    body: JSON.stringify({ playerChoice }),
  });
}

export async function resetStats(): Promise<ResetResponse> {
  return request<ResetResponse>('/reset', {
    method: 'POST',
  });
}

export async function fetchStats(): Promise<GameStats> {
  return request<GameStats>('/stats', {
    method: 'GET',
  });
}
