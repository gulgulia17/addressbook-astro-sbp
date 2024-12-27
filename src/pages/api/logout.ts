import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ cookies, redirect }) => {
    // Clear the token cookie
    cookies.delete('token', {
        path: '/'
    });

    return new Response(JSON.stringify({
        success: true,
        message: 'Logged out successfully'
    }));
}