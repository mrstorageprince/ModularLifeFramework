import { InMemoryFactionRepository } from '../core/repositories/faction/InMemoryFactionRepository';
import { FactionManager } from '../core/modules/factions/FactionManager';

async function testFactions() {
    const repo = new InMemoryFactionRepository();
    const manager = new FactionManager(repo);

    // Create a new faction
    const faction = await manager.createFaction('Alpha', 'The Alpha Faction', 'player1', 'John Doe');
    console.log('✅ Created Faction:', faction);

    // Add a member
    await manager.joinFaction(faction.id, 'player2', 'Jane Smith');
    const details = await manager.getFactionDetails(faction.id);
    console.log('👥 Faction Details:', details);

    // Delete the faction
    await manager.deleteFaction(faction.id);
    console.log('🗑️ Faction deleted successfully.');
}

testFactions();
