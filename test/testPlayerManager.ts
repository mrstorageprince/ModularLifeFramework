import { InMemoryPlayerRepository } from "../core/repositories/player/InMemoryPlayerRepository";
import { PlayerManager } from "../core/modules/player/playerManager";

(async () => {
    // Instantiate the in-memory repository and the player manager
    const repository = new InMemoryPlayerRepository();
    const manager = new PlayerManager(repository);

    // Create a new player
    console.log("🚀 Creating a player...");
    const player = await manager.createPlayer("John Doe");
    console.log("✅ Created Player:", player);

    // Retrieve the player's details
    console.log("🚀 Fetching player details...");
    const fetchedPlayer = await manager.getPlayer(player.playerId);
    console.log("👤 Player Details:", fetchedPlayer);

    // Update the player's police status
    console.log("🚀 Updating player's police status...");
    const updatedPlayer = await manager.updatePlayer(player.playerId, { isPolice: true });
    console.log("🔄 Updated Player:", updatedPlayer);

    // Retrieve all players
    console.log("🚀 Retrieving all players...");
    const allPlayers = await manager.getAllPlayers();
    console.log("👥 All Players:", allPlayers);

    // Delete the player
    console.log("🚀 Deleting player...");
    const deletionResult = await manager.deletePlayer(player.playerId);
    console.log(deletionResult ? "🗑️ Player deleted successfully." : "❌ Failed to delete player.");

    // Verify deletion: Attempt to retrieve the deleted player
    const afterDeletion = await manager.getPlayer(player.playerId);
    console.log("🔍 Player after deletion (should be undefined):", afterDeletion);
})();
