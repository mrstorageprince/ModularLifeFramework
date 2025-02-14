import { IFactionRepository } from "../../repositories/faction/IFactionRepository";
import { Faction, FactionMember, Coalition } from "../../models/factions/FactionTypes";
import { v4 as uuidv4 } from "uuid";

export class FactionManager {
    constructor(private repository: IFactionRepository) {}

    // Create a new faction
    async createFaction(name: string, description: string, treasuryId: string): Promise<Faction> {
        const faction: Faction = {
            factionId: 0,
            name,
            description,
            treasuryId,
            createdAt: new Date(),
        };
        return this.repository.createFaction(faction);
    }

    // Delete a faction
    async deleteFaction(factionId: number): Promise<boolean> {
        return this.repository.deleteFaction(factionId);
    }

    // Add a member to a faction
    async addMember(factionId: number, playerId: string, role: 'leader' | 'officer' | 'member'): Promise<FactionMember> {
        const member: FactionMember = {
            memberId: uuidv4(),
            playerId,
            factionId,
            role,
            joinedAt: new Date(),
        };
        return this.repository.addMember(member);
    }

    // Remove a member
    async removeMember(memberId: string): Promise<boolean> {
        return this.repository.removeMember(memberId);
    }

    // Create a coalition with minimum two factions
    async createCoalition(name: string, description: string, treasuryId: string, factionIds: number[]): Promise<Coalition> {
        if (factionIds.length < 2) {
            throw new Error("A coalition requires at least two factions.");
        }

        // Validate factions
        const validFactions = [];
        for (const factionId of factionIds) {
            const faction = await this.repository.findFactionById(factionId);
            if (!faction) throw new Error(`Faction ID ${factionId} not found.`);
            if (faction.coalitionId) throw new Error(`Faction ID ${factionId} is already part of a coalition.`);
            validFactions.push(faction);
        }

        // Create coalition
        const coalition: Coalition = {
            coalitionId: uuidv4(),
            name,
            description,
            treasuryId,
            factionIds,
            createdAt: new Date(),
        };

        const createdCoalition = await this.repository.createCoalition(coalition);

        // Update factions to point to this coalition
        for (const faction of validFactions) {
            faction.coalitionId = createdCoalition.coalitionId;
            await this.repository.updateFaction(faction);
        }

        return createdCoalition;
    }

    // Remove a faction from a coalition
    async removeFactionFromCoalition(factionId: number): Promise<void> {
        const faction = await this.repository.findFactionById(factionId);
        if (!faction || !faction.coalitionId) throw new Error("Faction is not part of any coalition.");

        faction.coalitionId = undefined;
        await this.repository.updateFaction(faction);
    }
}
