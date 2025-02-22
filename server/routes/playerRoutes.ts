import express from "express";
import { PlayerService } from "../../core/player/services/PlayerService";
import { JsonPlayerRepository } from "../../core/player/repositories/JsonPlayerRepository";

const router = express.Router();

// Initialize the PlayerService with JSON storage
const playerService = new PlayerService(new JsonPlayerRepository());

/**
 * @route   POST /api/players
 * @desc    Create a new player
 * @access  Public (Authentication will be added later)
 */
router.post("/", async (req, res) => {
    const { username, email, displayName, externalIds } = req.body;

    if (!username || !email || !displayName) {
        return res.status(400).json({ error: "Missing required fields." });
    }

    try {
        const player = await playerService.createPlayer(username, email, displayName, externalIds);
        res.status(201).json(player);
    } catch (error) {
        res.status(500).json({ error: "Could not create player." });
    }
});

/**
 * @route   GET /api/players
 * @desc    Get all players
 * @access  Public
 */
router.get("/", async (req, res) => {
    try {
        const players = await playerService.getAllPlayers();
        res.json(players);
    } catch (error) {
        res.status(500).json({ error: "Could not fetch players." });
    }
});

/**
 * @route   GET /api/players/:id
 * @desc    Get a specific player by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
    try {
        const player = await playerService.getPlayer(req.params.id);
        if (!player) {
            return res.status(404).json({ error: "Player not found." });
        }
        res.json(player);
    } catch (error) {
        res.status(500).json({ error: "Could not fetch player." });
    }
});

/**
 * @route   DELETE /api/players/:id
 * @desc    Delete a player by ID
 * @access  Public
 */
router.delete("/:id", async (req, res) => {
    try {
        const success = await playerService.deletePlayer(req.params.id);
        if (!success) {
            return res.status(404).json({ error: "Player not found." });
        }
        res.json({ message: "Player deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: "Could not delete player." });
    }
});

/**
 * @route   DELETE /api/players/wipe
 * @desc    Wipe all player data (Admin function)
 * @access  Admin (Authentication will be added later)
 */
router.delete("/wipe", async (req, res) => {
    try {
        await playerService.wipeAllPlayers();
        res.json({ message: "All player data has been wiped." });
    } catch (error) {
        res.status(500).json({ error: "Could not wipe player data." });
    }
});

export default router;
