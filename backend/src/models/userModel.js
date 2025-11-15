import db from '../config/db.js';

export async function createUser({ email, password_hash, full_name, signup_type, gender, mobile_no }) {
  const q = `INSERT INTO users (email, password, full_name, signup_type, gender, mobile_no)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const { rows } = await db.query(q, [email, password_hash, full_name, signup_type, gender, mobile_no]);
  return rows[0];
}

export async function findUserByEmail(email) {
  const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [email]);
  return rows[0];
}

export async function findUserById(id) {
  const { rows } = await db.query('SELECT * FROM users WHERE id=$1', [id]);
  return rows[0];
}

export async function updateUser(id, patch) {
  const fields = [];
  const values = [];
  let idx = 1;
  for (const k of Object.keys(patch)) {
    fields.push(`${k} = $${idx++}`);
    values.push(patch[k]);
  }
  values.push(id);
  const q = `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${idx} RETURNING *`;
  const { rows } = await db.query(q, values);
  return rows[0];
}
