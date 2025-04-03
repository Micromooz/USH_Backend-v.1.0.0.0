import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Log safe DB config info
console.log("📦 Connecting to DB...");
console.log(`🌐 Host: ${process.env.DB_HOST}`);
console.log(`👤 User: ${process.env.DB_USER}`);
console.log(`📘 Database: ${process.env.DB_NAME}`);

// Create the pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
});

// Test the connection on startup
(async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping(); // Optional, quick check
    console.log("✅ Successfully connected to MySQL!");
    connection.release();
  } catch (error: any) {
    console.error("❌ Failed to connect to DB:");
    console.error("Error:", error.message);
    process.exit(1); // Optional: crash the app if DB is essential
  }
})();

export default pool;
