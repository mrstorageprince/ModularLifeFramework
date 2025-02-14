import { IFactionRepository } from "./IFactionRepository";
import { Faction, FactionMember, Coalition } from "../../models/factions/FactionTypes";
import { DataSource, Repository } from "typeorm";
import { FactionEntity } from "../../entities/factions/FactionEntity";
import { FactionMemberEntity } from "../../entities/factions/FactionMemberEntity";
import { v4 as uuidv4 } from "uuid";

export class PostgresFactionRepository implements IFactionRepository {
    private factionRepo: Repository<FactionEntity>;
    private memberRepo: Repository<FactionMemberEntity>;

    constructor(private dataSource: DataSource) {
        this.factionRepo = this.dataSource.getRepository(FactionEntity);
        this.memberRepo = this.dataSource.getRepository(FactionMemberEntity);
    }

    // ======== Factions ========

    async createFaction(faction: Faction): Promise<Faction> {
        const factionEntity = this.factionRepo.create({
            name: faction.name,
            description: faction.description,
            treasuryId: faction.treasuryId,
            coalitionId: faction.coalitionId,
            createdAt: new Date(),
        });
        const savedFaction = await this.factionRepo.save(factionEntity);
        return this.toFaction(savedFaction);
    }

    async deleteFaction(factionId: number): Promise<boolean> {
        const result = await this.factionRepo.delete({ factionId });
        return result.affected !== undefined && result.affected > 0;
    }

    async findFactionById(factionId: number): Promise<Faction | undefined> {
        const factionEntity = await this.factionRepo.findOneBy({ factionId });
        return factionEntity ? this.toFaction(factionEntity) : undefined;
    }

    async updateFaction(faction: Faction): Promise<Faction> {
        const existing = await this.factionRepo.findOneBy({ factionId: faction.factionId });
        if (!existing) throw new Error(`Faction with ID ${faction.factionId} not found`);

        const updated = { ...existing, ...faction };
        const savedFaction = await this.factionRepo.save(updated);
        return this.toFaction(savedFaction);
    }

    // ======== Members ========

    async addMember(member: FactionMember): Promise<FactionMember> {
        const memberEntity = this.memberRepo.create({
            memberId: uuidv4(),
            playerId: member.playerId,
            factionId: member.factionId,
            role: member.role,
            joinedAt: new Date(),
        });
        const savedMember = await this.memberRepo.save(memberEntity);
        return this.toMember(savedMember);
    }

    async removeMember(memberId: string): Promise<boolean> {
        const result = await this.memberRepo.delete({ memberId });
        return result.affected !== undefined && result.affected > 0;
    }

    async findMembersByFactionId(factionId: number): Promise<FactionMember[]> {
        const members = await this.memberRepo.findBy({ factionId });
        return members.map((member) => this.toMember(member));
    }

    // ======== Coalitions ========

    async createCoalition(coalition: Coalition): Promise<Coalition> {
        const result = await this.dataSource.query(`
      INSERT INTO coalitions (coalition_id, name, description, treasury_id, faction_ids, created_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [
            uuidv4(),
            coalition.name,
            coalition.description,
            coalition.treasuryId,
            JSON.stringify(coalition.factionIds),
            new Date(),
        ]);

        return this.toCoalition(result[0]);
    }

    async findCoalitionById(coalitionId: string): Promise<Coalition | undefined> {
        const result = await this.dataSource.query(`
      SELECT * FROM coalitions WHERE coalition_id = $1;
    `, [coalitionId]);

        return result.length > 0 ? this.toCoalition(result[0]) : undefined;
    }

    async updateCoalition(coalition: Coalition): Promise<Coalition> {
        const result = await this.dataSource.query(`
      UPDATE coalitions SET name = $2, description = $3, treasury_id = $4, faction_ids = $5 
      WHERE coalition_id = $1 RETURNING *;
    `, [
            coalition.coalitionId,
            coalition.name,
            coalition.description,
            coalition.treasuryId,
            JSON.stringify(coalition.factionIds),
        ]);

        if (result.length === 0) throw new Error(`Coalition with ID ${coalition.coalitionId} not found`);
        return this.toCoalition(result[0]);
    }

    async deleteCoalition(coalitionId: string): Promise<boolean> {
        const result = await this.dataSource.query(`
      DELETE FROM coalitions WHERE coalition_id = $1;
    `, [coalitionId]);
        return result.rowCount > 0;
    }

    // ======== Helper Methods ========

    private toFaction(entity: FactionEntity): Faction {
        return {
            factionId: entity.factionId,
            name: entity.name,
            description: entity.description,
            treasuryId: entity.treasuryId,
            coalitionId: entity.coalitionId ?? undefined,
            createdAt: entity.createdAt,
        };
    }

    private toMember(entity: FactionMemberEntity): FactionMember {
        return {
            memberId: entity.memberId,
            playerId: entity.playerId,
            factionId: entity.factionId,
            role: entity.role as 'leader' | 'officer' | 'member',
            joinedAt: entity.joinedAt,
        };
    }

    private toCoalition(entity: any): Coalition {
        return {
            coalitionId: entity.coalition_id,
            name: entity.name,
            description: entity.description,
            treasuryId: entity.treasury_id,
            factionIds: JSON.parse(entity.faction_ids),
            createdAt: new Date(entity.created_at),
        };
    }
}
