import type { APIContext } from 'astro';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import db from '../../db/setup';

export async function isAuthenticated({ request, cookies }: APIContext) {
  const token = request.headers.get('Authorization')?.split(' ')[1] || cookies.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as jwt.JwtPayload;

    const user = db.prepare('SELECT id, email, name, role FROM users WHERE id = ?').get(decoded.id);

    if (!user) {
      return null;
    }

    return user;
  } catch (err) {
    return null;
  }
}

export function requireAuth(context: APIContext) {
  const user = isAuthenticated(context);
  if (!user) {
    return context.redirect('/auth/login');
  }
  return user;
}