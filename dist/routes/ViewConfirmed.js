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
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
// ✅ Ping route to confirm the router is working
router.get("/ping", (req, res) => {
    console.log("✅ /api/ping HIT");
    res.send("pong from ViewConfirmed ✅");
});
// ✅ Main route to fetch confirmed bookings
router.get("/viewConfirmed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔁 /api/viewConfirmed HIT");
    try {
        const { date } = req.query;
        if (!date || typeof date !== "string") {
            return res.status(400).json({ error: "Date is required and must be a string" });
        }
        const query = `
      SELECT Booking_ID, Customer_Name, Phone, Email, Booking_Type, Booking_Service, 
             Date_Booked, Booking_TimeSlot, Date_of_Booking, Amount, Status 
      FROM USHBKNG 
      WHERE Date_Booked = ? AND Status = 'Confirmed'
    `;
        console.log("🧾 Executing SQL Query:", query, "With Date:", date);
        const [results] = yield db_1.default.execute(query, [date]);
        console.log("✅ Query Results:", results);
        res.json(results);
    }
    catch (error) {
        console.error("🔥 Error in /viewConfirmed:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}));
exports.default = router;
