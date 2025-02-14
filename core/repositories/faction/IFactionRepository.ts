import { Faction } from '../../models/factions/FactionTypes';

export interface IFactionRepository {
    findById(id: number): Promise<Faction | undefined>;
    findByName(name: string): Promise<Faction | undefined>;
    findAll(): Promise<Faction[]>;
    save(faction: Faction): Promise<void>;
    delete(id: number): Promise<void>;
}