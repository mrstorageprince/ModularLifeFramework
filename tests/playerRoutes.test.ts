import request from "supertest";
import { app, server, startServer, stopServer } from "../server/server";
import { ConfigManager } from "../server/config/configManager";
import { Player } from "../core/player/models/PlayerType";

describe("🛠️ Player Routes - API Tests", () => {
    let createdPlayer: Player | null = null;
    let storageType: string = "";

    /**
     * ✅ Before tests:
     * - Start the server if it's not already running.
     * - Load the current storage mode (JSON or PostgreSQL).
     * - Ensure config is properly loaded.
     */
    beforeAll(async () => {
        if (!server) {
            console.log("🔄 Starting test server...");
            await startServer();
        }

        await ConfigManager.loadConfig();
        const config = ConfigManager.getConfig();
        storageType = config.storageType;
        console.log(`\n🔹 Running Tests in ${storageType.toUpperCase()} Mode`);

        // ✅ Create a test player
        const newPlayer = {
            username: "TestPlayer",
            email: "test@example.com",
            displayName: "Test User",
            externalIds: { arma3: "12345", reforger: "67890" }
        };

        const response = await request(app).post("/api/players").send(newPlayer);
        if (response.status === 201) {
            createdPlayer = response.body;
            console.log("🟢 Created Test Player:", createdPlayer);
        } else {
            console.error("❌ Failed to create a test player:", response.body);
        }
    });

    /**
     * ✅ Test: Create a new player successfully
     */
    it("✅ Should create a new player successfully", async () => {
        const newPlayer = {
            username: "TestPlayer2",
            email: "test2@example.com",
            displayName: "Test User 2",
            externalIds: { arma3: "12346", reforger: "67891" }
        };

        const response = await request(app).post("/api/players").send(newPlayer);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("playerId");
        console.log("🟢 Player Created:", response.body);
    });

    /**
     * ✅ Test: Fail to create a player with missing fields
     */
    it("❌ Should fail to create a player with missing fields", async () => {
        const response = await request(app).post("/api/players").send({ username: "MissingEmail" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
        console.log("🔴 Expected Failure:", response.body);
    });

    /**
     * ✅ Test: Fetch an existing player
     */
    it("✅ Should fetch an existing player by ID", async () => {
        if (!createdPlayer) throw new Error("No player was created to fetch.");

        const response = await request(app).get(`/api/players/${createdPlayer.playerId}`);
        expect(response.status).toBe(200);
        expect(response.body.email).toBe(createdPlayer.email);
        console.log("🟢 Fetched Player:", response.body);
    });

    /**
     * ✅ Test: Fail to fetch a non-existent player
     */
    it("❌ Should return 404 for a non-existent player", async () => {
        const response = await request(app).get("/api/players/nonexistent-id");
        expect(response.status).toBe(404);
        console.log("🔴 Expected 404:", response.body);
    });

    /**
     * ✅ Test: Fetch all players
     */
    it("✅ Should fetch all players", async () => {
        const response = await request(app).get("/api/players");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        console.log(`🟢 Player List Fetched: ${response.body.length} players found`);
    });

    /**
     * ✅ Test: Delete an existing player
     */
    it("✅ Should delete an existing player", async () => {
        if (!createdPlayer) throw new Error("No player was created to delete.");

        const response = await request(app).delete(`/api/players/${createdPlayer.playerId}`);
        expect(response.status).toBe(200);
        console.log("🟢 Deleted Player:", createdPlayer.playerId);
    });

    /**
     * ✅ Test: Fail to delete a non-existent player
     */
    it("❌ Should return 404 when trying to delete a non-existent player", async () => {
        const response = await request(app).delete("/api/players/nonexistent-id");
        expect(response.status).toBe(404);
        console.log("🔴 Expected 404 on Delete:", response.body);
    });

    /**
     * ✅ Ensure Jest cleans up properly.
     */
    afterAll(async () => {
        console.log("\n✅ All Player API Tests Completed");

        // ✅ Delay to ensure async cleanup completes
        await new Promise((resolve) => setTimeout(resolve, 250));

        // ✅ Stop the test server
        await stopServer();
    });
});
