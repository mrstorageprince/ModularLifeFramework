import { IFactionRepository } from '../../repositories/faction/IFactionRepository';
import { Faction, FactionMember, FactionRole, FactionStatus } from '../../models/factions/FactionTypes';

export class FactionManager {
    constructor(private repo: IFactionRepository) {}

    async createFaction(name: string, description: string, leaderId: string, leaderName: string): Promise<Faction> {
        const existing = await this.repo.findByName(name);
        if (existing) throw new Error('Faction already exists.');

        const faction: Faction = {
            id: Date.now(),
            name,
            description,
            members: [{
                playerId: leaderId,
                playerName: leaderName,
                role: FactionRole.LEADER,
                joinedAt: new Date()
            }],
            status: FactionStatus.ACTIVE,
            createdAt: new Date()
        };

        await this.repo.save(faction);
        return faction;
    }

    async joinFaction(factionId: number, playerId: string, playerName: string): Promise<void> {
        const faction = await this.repo.findById(factionId);
        if (!faction) throw new Error('Faction not found.');

        faction.members.push({
            playerId,
            playerName,
            role: FactionRole.MEMBER,
            joinedAt: new Date()
        });

        await this.repo.save(faction);
    }

    async getFactionDetails(factionId: number) {
        return this.repo.findById(factionId);
    }

    async deleteFaction(factionId: number) {
        await this.repo.delete(factionId);
    }
}
