import axios from 'axios';

/**
 * Configured Axios instance for making HTTP requests in the application.
 *
 * @description
 * This instance is pre-configured with:
 * - A baseURL that adapts to different environments (Vercel, development, etc.)
 * - Default headers for JSON content
 *
 * The baseURL priority is:
 * 1. NEXT_PUBLIC_VERCEL_URL (for Vercel deployments)
 * 2. __NEXT_PRIVATE_ORIGIN (for Next.js internal routing)
 * 3. http://localhost:3000 (fallback for local development)
 *
 * @example
 * import { api } from '@/lib/axios';
 *
 * // Making a GET request
 * const response = await api.get('/api/documents');
 *
 * // Making a POST request
 * const data = await api.post('/api/document', { title: 'New Document' });
 */
export const api = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        process.env['__NEXT_PRIVATE_ORIGIN'] ??
        'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});
