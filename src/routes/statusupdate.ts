import express, { Request, Response } from 'express';
import pool from "../config/db"; // Ensure the correct database connection

const router = express.Router();

console.log("✅ statusupdate.ts loaded"); // Debug log

// ✅ Update Booking Status (Confirm or Cancel)
router.put('/statusupdated', async (req: Request, res: Response) => {
    try {
        const { bookingId, status } = req.body;

        if (!bookingId || !['Confirmed', 'Cancelled'].includes(status)) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        console.log(`🔄 Updating Booking ID ${bookingId} to status: ${status}`);

        await pool.query("UPDATE USHBKNG SET Status = ? WHERE Booking_ID = ?", [status, bookingId]);

        console.log(`✅ Booking ${bookingId} updated to ${status}`);
        res.json({ message: `Booking ${bookingId} updated to ${status}` });
    } catch (error) {
        console.error("❌ Error updating booking:", error);
        res.status(500).json({ error: 'Failed to update booking' });
    }
});

// ✅ Delete Booking
router.delete('/deletebooking/:bookingId', async (req: Request, res: Response) => {
    try {
        const { bookingId } = req.params;

        if (!bookingId) {
            return res.status(400).json({ error: 'Invalid request' });
        }

        console.log(`🗑 Deleting Booking ID: ${bookingId}`);

        await pool.query("DELETE FROM USHBKNG WHERE Booking_ID = ?", [bookingId]);

        console.log(`✅ Booking ${bookingId} deleted successfully`);
        res.json({ message: `Booking ${bookingId} deleted successfully` });
    } catch (error) {
        console.error("❌ Error deleting booking:", error);
        res.status(500).json({ error: 'Failed to delete booking' });
    }
});

export default router;
