import { z } from 'zod';
import { insertUserSchema, insertStockSchema, insertMutualFundSchema, users, stocks, mutualFunds } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    login: {
      method: 'POST' as const,
      path: '/api/login' as const,
      input: z.object({ email: z.string(), password: z.string() }),
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.notFound,
      }
    },
    register: {
      method: 'POST' as const,
      path: '/api/register' as const,
      input: z.object({ email: z.string(), password: z.string() }),
      responses: {
        201: z.custom<typeof users.$inferSelect>(),
        400: errorSchemas.validation,
      }
    },
    logout: {
      method: 'POST' as const,
      path: '/api/logout' as const,
      responses: {
        200: z.object({ message: z.string() }),
      }
    },
    me: {
      method: 'GET' as const,
      path: '/api/me' as const,
      responses: {
        200: z.custom<typeof users.$inferSelect>(),
        401: errorSchemas.notFound,
      }
    }
  },
  stocks: {
    list: {
      method: 'GET' as const,
      path: '/api/stocks' as const,
      responses: {
        200: z.array(z.custom<typeof stocks.$inferSelect>()),
      }
    },
  },
  mutualFunds: {
    list: {
      method: 'GET' as const,
      path: '/api/mutual-funds' as const,
      responses: {
        200: z.array(z.custom<typeof mutualFunds.$inferSelect>()),
      }
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
