import express from "express";
import { ConfigManager } from "./config/configManager";
import configRoutes from "./routes/configRoutes";
import playerRoutes from "./routes/playerRoutes";

const app = express();
app.use(express.json());

let server: any;

/**
 * Start the server and load config.
 */
const startServer = async () => {
    if (server) return; // ✅ Prevent duplicate starts

    try {
        await ConfigManager.loadConfig();
        console.log(`Server Config Loaded:`, ConfigManager.getConfig());

        const PORT = process.env.PORT || 3000;
        app.use("/api/config", configRoutes);
        app.use("/api/players", playerRoutes);

        server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
        return server;
    } catch (error) {
        console.error("❌ Server failed to start:", error);
        process.exit(1);
    }
};

/**
 * Stop the server (for Jest tests).
 */
const stopServer = async () => {
    if (server) {
        await new Promise((resolve) => server.close(resolve));
        console.log("🛑 Server closed successfully.");
        server = null;
    }
};

// ✅ Start server only if not running tests
if (process.env.NODE_ENV !== "test") {
    startServer();
}

// ✅ Export for testing
export { app, server, startServer, stopServer };
