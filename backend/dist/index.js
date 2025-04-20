"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Login route
app.post("/api/auth/login", async (req, res) => {
    try {
        const { uid, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { uid },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "1h" });
        res.json({ token });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
// Register route (for testing purposes)
app.post("/api/auth/register", async (req, res) => {
    try {
        const { uid, password } = req.body;
        const existingUser = await prisma.user.findUnique({
            where: { uid },
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                uid,
                password: hashedPassword,
            },
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
