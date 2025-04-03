import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import bookingRoutes from "./routes/bookingRoutes";
import pendingtransactions from "./routes/pendingtransactions"; 
import statusUpdateRoutes from "./routes/statusupdate";
import viewConfirmedRoutes from "./routes/ViewConfirmed";
import timeslotRoutes from "./routes/timeslots";


dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://urbansportzhub.in',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Booking routes
app.use("/api/bookings", bookingRoutes);
//Pending Transactions
app.use("/api", pendingtransactions);
//Updating Transactions
app.use("/api", statusUpdateRoutes);
//Confirmed Bookings
app.use("/api", viewConfirmedRoutes);
//Booking Slots
app.use('/api/timeslots', timeslotRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
