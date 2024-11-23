import axios from 'axios';

export const api = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_VERCEL_URL ??
        process.env['__NEXT_PRIVATE_ORIGIN'] ??
        'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});
