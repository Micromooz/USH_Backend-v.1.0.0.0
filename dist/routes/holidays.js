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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const router = express_1.default.Router();
// ✅ GET /api/holidays
router.get('/holidays', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.default.query('SELECT * FROM USHHOLI ORDER BY date ASC');
        res.json(rows);
    }
    catch (err) {
        console.error("❌ Error fetching holidays:", err);
        res.status(500).json({ error: 'Failed to fetch holidays' });
    }
}));
// ✅ POST /api/holidays
router.post('/holidays', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { date, description } = req.body;
    if (!date || !description) {
        return res.status(400).json({ error: 'Missing date or description' });
    }
    try {
        const [result] = yield db_1.default.query('INSERT INTO USHHOLI (date, description) VALUES (?, ?)', [date, description]);
        res.status(201).json({ id: result.insertId, date, description });
    }
    catch (err) {
        console.error("❌ Error adding holiday:", err);
        res.status(500).json({ error: 'Failed to add holiday' });
    }
}));
// ✅ DELETE /api/holidays/:id
router.delete('/holidays/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield db_1.default.query('DELETE FROM USHHOLI WHERE id = ?', [id]);
        res.sendStatus(204); // No content
    }
    catch (err) {
        console.error("❌ Error deleting holiday:", err);
        res.status(500).json({ error: 'Failed to delete holiday' });
    }
}));
exports.default = router;
