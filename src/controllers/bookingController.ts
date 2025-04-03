// src/controllers/bookingController.ts

import { Request, Response } from "express";
import pool from "../config/db";

// Create booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { 
      Customer_Name, 
      Phone, 
      Email, 
      Booking_Service, 
      Date_Booked, 
      Booking_TimeSlot, 
      Date_of_Booking, 
      Amount 
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO USHBKNG (Customer_Name, Phone, Email, Booking_Service, Date_Booked, Booking_TimeSlot, Date_of_Booking, Amount) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Customer_Name, 
        Phone, 
        Email, 
        Booking_Service, 
        Date_Booked, 
        Booking_TimeSlot, 
        Date_of_Booking, 
        Amount
      ]
    );

    res.status(201).json({ message: "Booking created successfully", result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};

// Get all bookings
export const getBookings = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT * FROM USHBKNG");
    res.json(rows);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message || "Internal Server Error" });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
