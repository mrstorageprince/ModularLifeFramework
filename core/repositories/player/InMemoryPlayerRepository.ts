// core/repositories/player/InMemoryPlayerRepository.ts
import { IPlayerRepository } from "./IPlayerRepository";
import { Player } from "../../models/player/PlayerTypes";
import { v4 as uuidv4 } from "uuid";

export class InMemoryPlayerRepository implements IPlayerRepository {
    private players: Map<string, Player> = new Map<string, Player>();

    async create(playerName: string, factionId: number | null = null): Promise<Player> {
        const now = new Date();
        const newPlayer: Player = {
            playerId: uuidv4(),
            playerName,
            factionId,
            moneyBalance: 0,
            isPolice: false,
            lastLogin: now,
            createdAt: now,
        };
        this.players.set(newPlayer.playerId, newPlayer);
        return newPlayer;
    }

    async findById(playerId: string): Promise<Player | undefined> {
        return this.players.get(playerId);
    }

    async update(playerId: string, updates: Partial<Player>): Promise<Player | undefined> {
        const player = this.players.get(playerId);
        if (!player) return undefined;
        const updatedPlayer = { ...player, ...updates };
        this.players.set(playerId, updatedPlayer);
        return updatedPlayer;
    }

    async delete(playerId: string): Promise<boolean> {
        return this.players.delete(playerId);
    }

    async findAll(): Promise<Player[]> {
        return Array.from(this.players.values());
    }
}