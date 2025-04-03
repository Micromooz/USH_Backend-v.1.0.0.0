import express from "express";
import { Request, Response } from "express";
import pool from "../config/db"; // Ensure this path is correct

const router = express.Router();

// Fetch confirmed bookings by date
router.get("/viewConfirmed", async (req: Request, res: Response) => {
	  console.log("🔁 /api/viewConfirmed HIT");
  try {
    const { date } = req.query;

    // Validate the date parameter
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "Date is required and must be a string" });
    }

    const query = `
      SELECT Booking_ID, Customer_Name, Phone, Email, Booking_Type, Booking_Service, 
             Date_Booked, Booking_TimeSlot, Date_of_Booking, Amount, Status 
      FROM USHBKNG 
      WHERE Date_Booked = ? AND Status = 'Confirmed'
    `;

    console.log("Executing SQL Query:", query, "With Date:", date);

    // Execute the query
    const [results] = await pool.execute(query, [date]);

    console.log("Query Results:", results);

    // Send the response
    res.json(results);
  } catch (error: any) {
    console.error("🔥 Error fetching bookings:", error);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message, // Sends the actual error message for debugging
    });
  }
});

export default router;
