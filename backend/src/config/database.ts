import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const config: sql.config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 55230,
  database: process.env.DB_NAME,

  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

let pool: sql.ConnectionPool | null = null;

export const connectDB = async () => {
  console.log("Trying to connect to SQL Server...");

  try {
    pool = await sql.connect(config);

    console.log("SQL Server connected successfully 🚀");

    return pool;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};

export const getDB = () => {
  if (!pool) {
    throw new Error("Database is not connected");
  }

  return pool;
};