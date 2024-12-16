import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();
const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  idleTimeoutMillis: 20000,
  max: 12,
});


const connectDb = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection established successfully!');
    client.release(); 
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
};

export { connectDb, pool };
