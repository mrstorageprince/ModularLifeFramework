import { IFactionRepository } from './IFactionRepository';
import { Faction } from '../../models/factions/FactionTypes';

export class InMemoryFactionRepository implements IFactionRepository {
    private factions: Faction[] = [];

    async findById(id: number): Promise<Faction | undefined> {
        return this.factions.find(f => f.id === id);
    }

    async findByName(name: string): Promise<Faction | undefined> {
        return this.factions.find(f => f.name === name);
    }

    async findAll(): Promise<Faction[]> {
        return this.factions;
    }

    async save(faction: Faction): Promise<void> {
        const existingIndex = this.factions.findIndex(f => f.id === faction.id);
        if (existingIndex !== -1) {
            this.factions[existingIndex] = faction;
        } else {
            this.factions.push(faction);
        }
    }

    async delete(id: number): Promise<void> {
        this.factions = this.factions.filter(f => f.id !== id);
    }
}
