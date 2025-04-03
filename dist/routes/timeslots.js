"use strict";
// ✅ Unified Backend Routes: src/routes/timeslots.ts
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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
// GET blocked slots by type and date
router.get('/blocked', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, type } = req.query;
    if (!date || !type)
        return res.status(400).json({ error: 'Missing date or type' });
    try {
        const [rows] = yield db_1.default.query('SELECT time_slot FROM USHBKSL WHERE date = ? AND booking_type = ?', [date, type]);
        const timeSlots = rows.map(row => row.time_slot);
        res.json(timeSlots);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}));
// POST block slots by type
router.post('/block', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, timeSlots, type } = req.body;
    if (!date || !Array.isArray(timeSlots) || !type)
        return res.status(400).json({ error: 'Invalid payload' });
    try {
        const values = timeSlots.map(slot => [date, slot, type]);
        yield db_1.default.query('INSERT INTO USHBKSL (date, time_slot, type) VALUES ?', [values]);
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}));
// POST unblock slots by type
router.post('/unblock', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, timeSlots, type } = req.body;
    if (!date || !Array.isArray(timeSlots) || !type)
        return res.status(400).json({ error: 'Invalid payload' });
    try {
        const placeholders = timeSlots.map(() => '?').join(',');
        const params = [date, type, ...timeSlots];
        yield db_1.default.query(`DELETE FROM USHBKSL WHERE date = ? AND booking_type = ? AND time_slot IN (${placeholders})`, params);
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}));
exports.default = router;
