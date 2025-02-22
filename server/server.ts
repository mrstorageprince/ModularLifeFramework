import express from "express";
import { ConfigManager } from "./config/configManager";
import configRoutes from "./routes/configRoutes";
import playerRoutes from "./routes/playerRoutes";

/**
 * Initialize the Express app
 */
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

/**
 * Load the server configuration before starting the app.
 * This ensures that settings like storage type and welcome message are applied correctly.
 */
(async () => {
    await ConfigManager.loadConfig();
    console.log(`Server Config Loaded:`, ConfigManager.getConfig());

    const PORT = process.env.PORT || 3000;

    // Register routes
    app.use("/api/config", configRoutes);
    app.use("/api/players", playerRoutes);

    // Start the server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
