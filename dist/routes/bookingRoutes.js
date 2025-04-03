"use strict";
// src/routes/bookingRoutes.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = require("../controllers/bookingController");
const router = express_1.default.Router();
// POST endpoint for creating a booking
router.post("/", bookingController_1.createBooking);
// GET endpoint for retrieving all bookings
router.get("/", bookingController_1.getBookings);
exports.default = router;
