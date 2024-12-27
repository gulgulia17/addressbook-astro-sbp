import type { APIRoute } from 'astro';
import bcrypt from 'bcryptjs';
import db from '../../../db/setup';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, password, role = 'user' } = data;

    if (!email || !password || !name) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Name, email, and password are required'
      }), { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid email format'
      }), { status: 400 });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Password must be at least 6 characters long'
      }), { status: 400 });
    }

    const existingUser = db.prepare('SELECT email FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Email already registered'
      }), { status: 400 });
    }

    const allowedRoles = ['user', 'admin'];
    if (!allowedRoles.includes(role)) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Invalid role specified'
      }), { status: 400 });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const result = db.prepare(`
      INSERT INTO users (
        name,
        email, 
        password,
        role,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
    `).run(name, email, hashedPassword, role);

    return new Response(JSON.stringify({
      success: true,
      message: 'Registration successful',
      userId: result.lastInsertRowid
    }), { status: 201 }); // Using 201 Created status

  } catch (error: any) {
    console.error('Registration error:', error);

    if (error.code === 'SQLITE_CONSTRAINT') {
      return new Response(JSON.stringify({
        success: false,
        message: 'Database constraint violation. Please try again.'
      }), { status: 400 });
    }

    return new Response(JSON.stringify({
      success: false,
      message: 'Server error during registration'
    }), { status: 500 });
  }
}