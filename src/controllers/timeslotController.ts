import { Request, Response } from "express";
import pool from "../config/db";

// ✅ Fetch blocked slots from USHBKSL
export const getBlockedSlots = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date is required" });

    const query = "SELECT time_slot FROM USHBKSL WHERE date = ?";
    const [results] = await pool.execute(query, [date]);

    const blockedSlots = (results as any[]).map((row) => row.time_slot);
    res.json(blockedSlots);
  } catch (error: any) {
    console.error("Error fetching blocked slots:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ Block slots into USHBKSL
export const blockSlots = async (req: Request, res: Response) => {
  try {
    const { date, slots } = req.body;
    if (!date || !Array.isArray(slots)) {
      return res.status(400).json({ error: "Date and slots are required" });
    }

    const query = "INSERT INTO USHBKSL (date, time_slot) VALUES (?, ?)";
    for (const slot of slots) {
      await pool.execute(query, [date, slot]);
    }

    res.json({ message: "Slots blocked successfully!" });
  } catch (error: any) {
    console.error("Error blocking slots:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};

// ✅ Unblock slots from USHBKSL
export const unblockSlots = async (req: Request, res: Response) => {
  try {
    const { date, slots } = req.body;
    if (!date || !Array.isArray(slots)) {
      return res.status(400).json({ error: "Date and slots are required" });
    }

    const query = "DELETE FROM USHBKSL WHERE date = ? AND time_slot = ?";
    for (const slot of slots) {
      await pool.execute(query, [date, slot]);
    }

    res.json({ message: "Slots unblocked successfully!" });
  } catch (error: any) {
    console.error("Error unblocking slots:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
