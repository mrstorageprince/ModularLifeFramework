import { Faction, FactionMember, Coalition } from "../../models/factions/FactionTypes";

export interface IFactionRepository {
    createFaction(faction: Faction): Promise<Faction>;
    deleteFaction(factionId: number): Promise<boolean>;
    findFactionById(factionId: number): Promise<Faction | undefined>;
    updateFaction(faction: Faction): Promise<Faction>;

    addMember(member: FactionMember): Promise<FactionMember>;
    removeMember(memberId: string): Promise<boolean>;
    findMembersByFactionId(factionId: number): Promise<FactionMember[]>;

    createCoalition(coalition: Coalition): Promise<Coalition>;
    findCoalitionById(coalitionId: string): Promise<Coalition | undefined>;
    updateCoalition(coalition: Coalition): Promise<Coalition>;
    deleteCoalition(coalitionId: string): Promise<boolean>;
}
