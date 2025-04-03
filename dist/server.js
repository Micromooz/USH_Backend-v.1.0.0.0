"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("⏳ Starting server setup...");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const pendingtransactions_1 = __importDefault(require("./routes/pendingtransactions"));
const statusupdate_1 = __importDefault(require("./routes/statusupdate"));
const ViewConfirmed_1 = __importDefault(require("./routes/ViewConfirmed"));
const timeslots_1 = __importDefault(require("./routes/timeslots"));
const holidays_1 = __importDefault(require("./routes/holidays"));
dotenv.config();
const app = (0, express_1.default)();
// ✅ CORS configuration
app.use((0, cors_1.default)({
    origin: 'https://urbansportzhub.in',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express_1.default.json());
console.log("📦 Registering routes...");
app.use("/api/bookings", bookingRoutes_1.default);
app.use("/api", pendingtransactions_1.default);
app.use("/api", statusupdate_1.default);
app.use("/api", ViewConfirmed_1.default);
app.use("/api/timeslots", timeslots_1.default);
app.use("/api", holidays_1.default);
// ✅ Catch-all 404 route
app.use("*", (req, res) => {
    console.log(`❌ 404 Not Found: ${req.originalUrl}`);
    res.status(404).send("Not Found");
});
// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
