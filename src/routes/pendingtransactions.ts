import express, { Request, Response } from 'express';
import pool from "../config/db"; // Ensure correct path

const router = express.Router();

console.log("✅ pendingtransactions.ts loaded"); // Debug log

// ✅ Test Route
router.get('/test', (req: Request, res: Response) => {
    console.log("✅ Test route hit!");
    res.json({ message: "Test route working!" });
});

// ✅ Pending Transactions Route
router.get('/pendingtransactions', async (req: Request, res: Response) => {
    console.log("✅ Received request at /api/pendingtransactions");

    try {
        console.log("✅ Query Params:", req.query);
        const { service } = req.query;

        if (!service || (service !== 'Turf' && service !== 'CCE')) {
            console.log("❌ Invalid service type received:", service);
            return res.status(400).json({ error: 'Invalid service type' });
        }

        console.log("🔍 Fetching pending transactions for:", service);

        const [rows] = await pool.query(
            "SELECT * FROM USHBKNG WHERE upper(Status) = 'PENDING' AND Booking_Type = ?",
            [service]
        );

        console.log("✅ Query result:", rows);
        res.json(rows);
    } catch (error) {
        console.error("❌ Error fetching pending transactions:", error);
        res.status(500).json({ error: 'Failed to fetch pending transactions' });
    }
});

// ✅ New Route: Update Booking Status
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

// ✅ New Route: Delete Booking
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
