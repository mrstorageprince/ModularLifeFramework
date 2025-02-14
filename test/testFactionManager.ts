import { InMemoryFactionRepository } from "../core/repositories/faction/InMemoryFactionRepository";
import { FactionManager } from "../core/modules/factions/FactionManager";

(async () => {
    const repo = new InMemoryFactionRepository();
    const manager = new FactionManager(repo);

    // Create factions
    const faction1 = await manager.createFaction("Alpha Squad", "A strong faction", "treasury-alpha");
    const faction2 = await manager.createFaction("Beta Legion", "Elite forces", "treasury-beta");

    console.log("✅ Factions created:", faction1, faction2);

    // Add members
    const member1 = await manager.addMember(faction1.factionId, "player1", "leader");
    const member2 = await manager.addMember(faction2.factionId, "player2", "member");

    console.log("✅ Members added:", member1, member2);

    // Attempt invalid coalition with only one faction
    try {
        await manager.createCoalition("Weak Coalition", "Should fail", "treasury-coalition", [faction1.factionId]);
    } catch (error) {
        if (error instanceof Error) {
            console.log("❌ Expected error:", error.message);
        } else {
            console.log("❌ Unexpected error:", error);
        }
    }

    // Create valid coalition
    const coalition = await manager.createCoalition(
        "United Alliance",
        "Strong coalition",
        "treasury-coalition",
        [faction1.factionId, faction2.factionId]
    );
    console.log("✅ Coalition created:", coalition);

    // Remove a member
    const removed = await manager.removeMember(member2.memberId);
    console.log(removed ? "✅ Member removed successfully" : "❌ Failed to remove member");

    // Delete a faction
    const deleted = await manager.deleteFaction(faction1.factionId);
    console.log(deleted ? "✅ Faction deleted successfully" : "❌ Failed to delete faction");
})();
