import { IFactionRepository } from "./IFactionRepository";
import { Faction, FactionMember, Coalition } from "../../models/factions/FactionTypes";

export class InMemoryFactionRepository implements IFactionRepository {
    private factions = new Map<number, Faction>();
    private members = new Map<string, FactionMember>();
    private coalitions = new Map<string, Coalition>();
    private factionCounter = 1;

    async createFaction(faction: Faction): Promise<Faction> {
        faction.factionId = this.factionCounter++;
        faction.createdAt = new Date();
        this.factions.set(faction.factionId, faction);
        return faction;
    }

    async deleteFaction(factionId: number): Promise<boolean> {
        return this.factions.delete(factionId);
    }

    async findFactionById(factionId: number): Promise<Faction | undefined> {
        return this.factions.get(factionId);
    }

    async updateFaction(faction: Faction): Promise<Faction> {
        this.factions.set(faction.factionId, faction);
        return faction;
    }

    async addMember(member: FactionMember): Promise<FactionMember> {
        this.members.set(member.memberId, member);
        return member;
    }

    async removeMember(memberId: string): Promise<boolean> {
        return this.members.delete(memberId);
    }

    async findMembersByFactionId(factionId: number): Promise<FactionMember[]> {
        return Array.from(this.members.values()).filter(m => m.factionId === factionId);
    }

    async createCoalition(coalition: Coalition): Promise<Coalition> {
        this.coalitions.set(coalition.coalitionId, coalition);
        return coalition;
    }

    async findCoalitionById(coalitionId: string): Promise<Coalition | undefined> {
        return this.coalitions.get(coalitionId);
    }

    async updateCoalition(coalition: Coalition): Promise<Coalition> {
        this.coalitions.set(coalition.coalitionId, coalition);
        return coalition;
    }

    async deleteCoalition(coalitionId: string): Promise<boolean> {
        return this.coalitions.delete(coalitionId);
    }
}
