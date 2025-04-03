console.log("⏳ Starting server setup...");

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

// ✅ CORS configuration
app.use(cors({
  origin: 'https://urbansportzhub.in',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

console.log("📦 Registering routes...");
app.use("/api/bookings", bookingRoutes);
app.use("/api", pendingtransactions);
app.use("/api", statusUpdateRoutes);
app.use("/api", viewConfirmedRoutes);
app.use("/api/timeslots", timeslotRoutes);

// ✅ Catch-all 404 route
app.use("*", (req, res) => {
  console.log(`❌ 404 Not Found: ${req.originalUrl}`);
  res.status(404).send("Not Found");
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
