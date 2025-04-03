import express, { Request, Response } from "express";
import pool from "../config/db";

const router = express.Router();

// ✅ Ping route to confirm the router is working
router.get("/ping", (req, res) => {
  console.log("✅ /api/ping HIT");
  res.send("pong from ViewConfirmed ✅");
});

// ✅ Main route to fetch confirmed bookings
router.get("/viewConfirmed", async (req: Request, res: Response) => {
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

    const [results] = await pool.execute(query, [date]);
    console.log("✅ Query Results:", results);

    res.json(results);
  } catch (error: any) {
    console.error("🔥 Error in /viewConfirmed:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

export default router;
