import express from "express";
import { ConfigManager } from "../config/configManager";

const router = express.Router();

/**
 * Route to get the server welcome message.
 */
router.get("/welcome", async (req, res) => {
    res.json({ message: ConfigManager.getConfig().welcomeMessage });
});

export default router;
