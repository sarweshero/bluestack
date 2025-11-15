// Test Supabase Connection
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'db.gtnmfielfsbxhulyvbaa.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'Sanu@2005.in',
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: 10000
});

console.log('Testing Supabase connection...');
console.log('Host:', 'db.gtnmfielfsbxhulyvbaa.supabase.co');

try {
  const result = await pool.query('SELECT NOW(), current_database(), current_user');
  console.log('✅ SUCCESS! Connected to Supabase');
  console.log('Time:', result.rows[0].now);
  console.log('Database:', result.rows[0].current_database);
  console.log('User:', result.rows[0].current_user);
  
  // Test tables
  const tables = await pool.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
    ORDER BY table_name
  `);
  
  console.log('\n📊 Tables in database:');
  if (tables.rows.length === 0) {
    console.log('⚠️  No tables found! You need to run the schema SQL in Supabase.');
  } else {
    tables.rows.forEach(row => console.log('  -', row.table_name));
  }
  
  await pool.end();
  console.log('\n✅ Connection test complete!');
  process.exit(0);
} catch (error) {
  console.error('❌ CONNECTION FAILED!');
  console.error('Error:', error.message);
  console.error('\nPossible solutions:');
  console.error('1. Check if Supabase project is fully initialized (wait 2-3 min after creation)');
  console.error('2. Verify password in Supabase Dashboard → Settings → Database');
  console.error('3. Check your internet connection');
  console.error('4. Make sure the host URL is correct');
  await pool.end();
  process.exit(1);
}
