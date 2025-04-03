"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Log safe DB config info
console.log("📦 Connecting to DB...");
console.log(`🌐 Host: ${process.env.DB_HOST}`);
console.log(`👤 User: ${process.env.DB_USER}`);
console.log(`📘 Database: ${process.env.DB_NAME}`);
// Create the pool
const pool = promise_1.default.createPool({
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
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield pool.getConnection();
        yield connection.ping(); // Optional, quick check
        console.log("✅ Successfully connected to MySQL!");
        connection.release();
    }
    catch (error) {
        console.error("❌ Failed to connect to DB:");
        console.error("Error:", error.message);
        process.exit(1); // Optional: crash the app if DB is essential
    }
}))();
exports.default = pool;
