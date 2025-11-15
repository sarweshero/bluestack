import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET || 'change_this_secret';
const days = parseInt(process.env.JWT_EXPIRES_DAYS || '90', 10);

export function signJwt(payload) {
  return jwt.sign(payload, secret, { expiresIn: `${days}d` });
}

export function verifyJwt(token) {
  return jwt.verify(token, secret);
}
