import createError from 'http-errors';
import { verifyJwt } from '../utils/jwt.js';
import { findUserById } from '../models/userModel.js';

export async function requireAuth(req, res, next) {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw createError(401, 'Missing Authorization header');
    const parts = auth.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') throw createError(401, 'Invalid Authorization header');

    const payload = verifyJwt(parts[1]);
    const user = await findUserById(payload.userId);
    if (!user) throw createError(401, 'Invalid token: user not found');

    req.user = user;
    next();
  } catch (err) {
    next(createError(401, err.message || 'Unauthorized'));
  }
}
