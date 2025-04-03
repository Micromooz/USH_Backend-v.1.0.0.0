// src/routes/bookingRoutes.ts

import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController";

const router = express.Router();

// POST endpoint for creating a booking
router.post("/", createBooking);

// GET endpoint for retrieving all bookings
router.get("/", getBookings);

export default router;
