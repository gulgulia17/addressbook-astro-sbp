import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../../db/setup';

const JWT_SECRET = import.meta.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is not set');
}

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
    try {
        const data = await request.json();
        const { email, password } = data;

        const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Invalid credentials'
            }), { status: 401 });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set HTTP-only cookie
        cookies.set('token', token, {
            httpOnly: true,
            secure: import.meta.env.PROD, // true in production, false in development
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 // 24 hours
        });

        return new Response(JSON.stringify({
            success: true,
            redirect: '/'
        }));
    } catch (error) {
        console.error('Login error:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Server error'
        }), { status: 500 });
    }
}