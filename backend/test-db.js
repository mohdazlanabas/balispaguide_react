// Database Connection Test Script
const db = require('./config/db');

async function testConnection() {
  try {
    console.log('\n🔍 Testing database connection...\n');

    const result = await db.query(`
      SELECT
        NOW() as current_time,
        current_database() as database,
        version() as pg_version
    `);

    const row = result.rows[0];

    console.log('✅ DATABASE CONNECTION SUCCESSFUL!\n');
    console.log('📊 Connection Details:');
    console.log('  Database:', row.database);
    console.log('  Current Time:', row.current_time);
    console.log('  PostgreSQL Version:', row.pg_version.split(' ')[1]);

    // Test table count
    const tableResult = await db.query(`
      SELECT COUNT(*) as table_count
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    console.log('  Tables Created:', tableResult.rows[0].table_count);

    // Test user count
    const userResult = await db.query('SELECT COUNT(*) as user_count FROM users');
    console.log('  Test Users:', userResult.rows[0].user_count);

    console.log('\n✅ All database tests passed!\n');

    await db.pool.end();
    process.exit(0);

  } catch (error) {
    console.error('\n❌ DATABASE CONNECTION FAILED!\n');
    console.error('Error:', error.message);
    console.error('\nCheck that:');
    console.error('  1. Docker Desktop is running');
    console.error('  2. PostgreSQL container is running: docker ps');
    console.error('  3. .env.local file exists with correct DATABASE_URL\n');
    process.exit(1);
  }
}

testConnection();
