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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db")); // Ensure correct path
const router = express_1.default.Router();
console.log("✅ pendingtransactions.ts loaded"); // Debug log
// ✅ Test Route
router.get('/test', (req, res) => {
    console.log("✅ Test route hit!");
    res.json({ message: "Test route working!" });
});
// ✅ Pending Transactions Route
router.get('/pendingtransactions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("✅ Received request at /api/pendingtransactions");
    try {
        console.log("✅ Query Params:", req.query);
        const { service } = req.query;
        if (!service || (service !== 'Turf' && service !== 'CCE')) {
            console.log("❌ Invalid service type received:", service);
            return res.status(400).json({ error: 'Invalid service type' });
        }
        console.log("🔍 Fetching pending transactions for:", service);
        const [rows] = yield db_1.default.query("SELECT * FROM USHBKNG WHERE upper(Status) = 'PENDING' AND Booking_Type = ?", [service]);
        console.log("✅ Query result:", rows);
        res.json(rows);
    }
    catch (error) {
        console.error("❌ Error fetching pending transactions:", error);
        res.status(500).json({ error: 'Failed to fetch pending transactions' });
    }
}));
// ✅ New Route: Update Booking Status
router.put('/statusupdated', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingId, status } = req.body;
        if (!bookingId || !['Confirmed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log(`🔄 Updating Booking ID ${bookingId} to status: ${status}`);
        yield db_1.default.query("UPDATE USHBKNG SET Status = ? WHERE Booking_ID = ?", [status, bookingId]);
        console.log(`✅ Booking ${bookingId} updated to ${status}`);
        res.json({ message: `Booking ${bookingId} updated to ${status}` });
    }
    catch (error) {
        console.error("❌ Error updating booking:", error);
        res.status(500).json({ error: 'Failed to update booking' });
    }
}));
// ✅ New Route: Delete Booking
router.delete('/deletebooking/:bookingId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingId } = req.params;
        if (!bookingId) {
            return res.status(400).json({ error: 'Invalid request' });
        }
        console.log(`🗑 Deleting Booking ID: ${bookingId}`);
        yield db_1.default.query("DELETE FROM USHBKNG WHERE Booking_ID = ?", [bookingId]);
        console.log(`✅ Booking ${bookingId} deleted successfully`);
        res.json({ message: `Booking ${bookingId} deleted successfully` });
    }
    catch (error) {
        console.error("❌ Error deleting booking:", error);
        res.status(500).json({ error: 'Failed to delete booking' });
    }
}));
exports.default = router;
