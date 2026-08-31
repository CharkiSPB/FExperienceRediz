export interface FetchOptions extends RequestInit {
  next?: { revalidate?: number; tags?: string[] };
}

export async function fetchWithRetry<T>(
  url: string,
  options?: FetchOptions,
  retries: number = 3,
  initialDelayMs: number = 1000
): Promise<T> {
  let lastError: Error | undefined;
  let delay = initialDelayMs;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        // Next.js 15 defaults for data fetching
        next: { revalidate: 3600, tags: options?.next?.tags || ['default'] },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt === retries) break;

      // Экспоненциальная задержка + джиттер для предотвращения thundering herd
      const jitter = Math.random() * 200;
      await new Promise((resolve) => setTimeout(resolve, delay + jitter));
      delay *= 2;
    }
  }

  throw lastError || new Error('Request failed after retries');
}