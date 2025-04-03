"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unblockSlots = exports.blockSlots = exports.getBlockedSlots = void 0;
const db_1 = __importDefault(require("../config/db"));
// ✅ Fetch blocked slots from USHBKSL
const getBlockedSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date } = req.query;
        if (!date)
            return res.status(400).json({ error: "Date is required" });
        const query = "SELECT time_slot FROM USHBKSL WHERE date = ?";
        const [results] = yield db_1.default.execute(query, [date]);
        const blockedSlots = results.map((row) => row.time_slot);
        res.json(blockedSlots);
    }
    catch (error) {
        console.error("Error fetching blocked slots:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});
exports.getBlockedSlots = getBlockedSlots;
// ✅ Block slots into USHBKSL
const blockSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, slots } = req.body;
        if (!date || !Array.isArray(slots)) {
            return res.status(400).json({ error: "Date and slots are required" });
        }
        const query = "INSERT INTO USHBKSL (date, time_slot) VALUES (?, ?)";
        for (const slot of slots) {
            yield db_1.default.execute(query, [date, slot]);
        }
        res.json({ message: "Slots blocked successfully!" });
    }
    catch (error) {
        console.error("Error blocking slots:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});
exports.blockSlots = blockSlots;
// ✅ Unblock slots from USHBKSL
const unblockSlots = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, slots } = req.body;
        if (!date || !Array.isArray(slots)) {
            return res.status(400).json({ error: "Date and slots are required" });
        }
        const query = "DELETE FROM USHBKSL WHERE date = ? AND time_slot = ?";
        for (const slot of slots) {
            yield db_1.default.execute(query, [date, slot]);
        }
        res.json({ message: "Slots unblocked successfully!" });
    }
    catch (error) {
        console.error("Error unblocking slots:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});
exports.unblockSlots = unblockSlots;
