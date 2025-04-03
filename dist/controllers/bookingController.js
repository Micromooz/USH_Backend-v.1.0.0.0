"use strict";
// src/controllers/bookingController.ts
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
exports.getBookings = exports.createBooking = void 0;
const db_1 = __importDefault(require("../config/db"));
// Create booking
const createBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Customer_Name, Phone, Email, Booking_Service, Date_Booked, Booking_TimeSlot, Date_of_Booking, Amount } = req.body;
        const [result] = yield db_1.default.query(`INSERT INTO USHBKNG (Customer_Name, Phone, Email, Booking_Service, Date_Booked, Booking_TimeSlot, Date_of_Booking, Amount) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
            Customer_Name,
            Phone,
            Email,
            Booking_Service,
            Date_Booked,
            Booking_TimeSlot,
            Date_of_Booking,
            Amount
        ]);
        res.status(201).json({ message: "Booking created successfully", result });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message || "Internal Server Error" });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.createBooking = createBooking;
// Get all bookings
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query("SELECT * FROM USHBKNG");
        res.json(rows);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message || "Internal Server Error" });
        }
        else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
});
exports.getBookings = getBookings;
