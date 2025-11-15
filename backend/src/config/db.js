import pkg from 'pg';
import dotenv from 'dotenv';
import mockDb from './mockDb.js';
dotenv.config();
const { Pool } = pkg;

let pool;
let useMockDb = false;

// Initialize database connection
async function initializeDb() {
  try {
    pool = new Pool({
      host: process.env.PGHOST,
      port: process.env.PGPORT,
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      max: 20,
      min: 2,
      connectionTimeoutMillis: 10000,
      idleTimeoutMillis: 30000,
      allowExitOnIdle: false,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    // Test connection
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    
    console.log('✅ PostgreSQL (Supabase) connected successfully');
  } catch (error) {
    console.log('⚠️  PostgreSQL not available, using in-memory database for testing');
    console.log('   Error:', error.message);
    useMockDb = true;
    pool = mockDb;
  }
}

// Initialize immediately
await initializeDb();

export default pool;
