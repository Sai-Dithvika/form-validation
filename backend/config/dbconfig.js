import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,  // Important for cloud providers like Supabase
  }
});
console.log(process.env.DATABASE_URL);

const connectDb = async () => {
  try {
    const client = await pool.connect();
    console.log('Database connection established successfully!');
    client.release();  // Release the client when done
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
};

export { connectDb, pool };
