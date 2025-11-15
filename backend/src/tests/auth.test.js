import request from 'supertest';
import app from '../server.js';

describe('Auth routes (basic smoke tests)', () => {
  test('GET / should return ok', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  // Note: Integration tests that interact with DB/Firebase are environment-dependent and skipped here.
});
