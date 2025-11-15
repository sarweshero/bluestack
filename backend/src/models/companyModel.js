import db from '../config/db.js';

export async function createCompany(profile) {
  const q = `INSERT INTO company_profile (
    owner_id, company_name, address, city, state, country, postal_code,
    website, logo_url, banner_url, industry, founded_date, description, social_links
  ) VALUES (
    $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14
  ) RETURNING *`;
  const vals = [
    profile.owner_id, profile.company_name, profile.address, profile.city,
    profile.state, profile.country, profile.postal_code, profile.website || null,
    profile.logo_url || null, profile.banner_url || null, profile.industry,
    profile.founded_date || null, profile.description || null, profile.social_links || null
  ];
  const { rows } = await db.query(q, vals);
  return rows[0];
}

export async function getCompanyByOwner(owner_id) {
  const { rows } = await db.query('SELECT * FROM company_profile WHERE owner_id=$1', [owner_id]);
  return rows[0];
}

export async function updateCompanyById(id, patch) {
  const fields = [];
  const values = [];
  let idx = 1;
  for (const k of Object.keys(patch)) {
    fields.push(`${k} = $${idx++}`);
    values.push(patch[k]);
  }
  values.push(id);
  const q = `UPDATE company_profile SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${idx} RETURNING *`;
  const { rows } = await db.query(q, values);
  return rows[0];
}
