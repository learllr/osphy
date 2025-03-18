import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "osphy",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT || 3307,
    dialectOptions: {
      ssl: false,
    },
  },
  production: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "database_production",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    port: process.env.DB_PORT || 3307,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
