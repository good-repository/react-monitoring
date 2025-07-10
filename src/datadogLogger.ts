// src/datadogLogger.ts

import { Logger, LogEntry } from './logging';

/**
 * DatadogLogger sends logs to Datadog via HTTP API.
 *
 * You must set DATADOG_API_KEY and DATADOG_LOGS_URL (default provided) in your environment.
 */
export class DatadogLogger implements Logger {
  private apiKey: string;
  private url: string;

  constructor(apiKey?: string, url?: string) {
    // For browser/React, use window.env or pass keys directly
    this.apiKey = apiKey || (typeof window !== 'undefined' && (window as any).DATADOG_API_KEY) || '';
    this.url = url || (typeof window !== 'undefined' && (window as any).DATADOG_LOGS_URL) || 'https://http-intake.logs.datadoghq.com/v1/input';
    if (!this.apiKey) {
      throw new Error('DatadogLogger: DATADOG_API_KEY is required');
    }
  }

  async log(entry: LogEntry): Promise<void> {
    const body = JSON.stringify({
      message: entry.message,
      ddtags: (entry.tags || []).join(','),
      level: entry.level,
      error: entry.error ? (entry.error instanceof Error ? entry.error.stack : entry.error) : undefined,
      context: entry.context,
      timestamp: entry.timestamp || new Date().toISOString(),
    });
    try {
      const res = await fetch(this.url + `?dd-api-key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      if (!res.ok) {
        // Optionally: fallback to console or queue for retry
        // console.error('Datadog log failed', res.status, await res.text());
      }
    } catch (err) {
      // Optionally: fallback to console or queue for retry
      // console.error('Datadog log network error', err);
    }
  }
}
