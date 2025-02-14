import { IFactionRepository } from './IFactionRepository';
import { Faction } from '../../models/factions/FactionTypes';
import { FactionEntity } from '../../../bridge/src/entities/factions/FactionEntity';
import { AppDataSource } from '../../../bridge/src/data-source';
import { Repository } from 'typeorm';

export class PostgresFactionRepository implements IFactionRepository {
    private repository: Repository<FactionEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(FactionEntity);
    }

    async findById(id: number): Promise<Faction | undefined> {
        const entity = await this.repository.findOne({ where: { id }, relations: ['members'] });
        return entity ? (entity as unknown as Faction) : undefined;
    }

    async findByName(name: string): Promise<Faction | undefined> {
        const entity = await this.repository.findOne({ where: { name }, relations: ['members'] });
        return entity ? (entity as unknown as Faction) : undefined;
    }

    async findAll(): Promise<Faction[]> {
        const entities = await this.repository.find({ relations: ['members'] });
        return entities.map(e => e as unknown as Faction);
    }

    async save(faction: Faction): Promise<void> {
        const entity = this.repository.create(faction as unknown as FactionEntity);
        await this.repository.save(entity);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}
