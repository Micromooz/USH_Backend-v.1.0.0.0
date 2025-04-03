"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const timeslotController_1 = require("../controllers/timeslotController");
const router = express_1.default.Router();
// ✅ Route to fetch blocked slots for a given date
router.get("/turf-blocked-slots", timeslotController_1.getBlockedSlots);
// ✅ Route to block slots for a given date
router.post("/turf-blocked-slots", timeslotController_1.blockSlots);
// ✅ Route to unblock slots for a given date
router.delete("/turf-blocked-slots", timeslotController_1.unblockSlots);
exports.default = router;
