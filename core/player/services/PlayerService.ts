import { IPlayerRepository } from "../repositories/IPlayerRepository";
import { Player } from "../models/PlayerType";
import { v4 as uuidv4 } from "uuid";

export class PlayerService {
    private playerRepo: IPlayerRepository;

    constructor(playerRepo: IPlayerRepository) {
        this.playerRepo = playerRepo;
    }

    /**
     * Create a new player
     */
    async createPlayer(username: string, email: string, displayName: string, externalIds?: any): Promise<Player> {
        const newPlayer: Player = {
            playerId: uuidv4(),
            username,
            email,
            displayName,
            externalIds
        };
        return this.playerRepo.createPlayer(newPlayer);
    }

    /**
     * Get a player by ID
     */
    async getPlayer(playerId: string): Promise<Player | null> {
        return this.playerRepo.getPlayer(playerId);
    }

    /**
     * Get all players
     */
    async getAllPlayers(): Promise<Player[]> {
        return this.playerRepo.getAllPlayers();
    }

    /**
     * Delete a player by ID
     */
    async deletePlayer(playerId: string): Promise<boolean> {
        return this.playerRepo.deletePlayer(playerId);
    }

    /**
     * Wipe all players (Admin function)
     */
    async wipeAllPlayers(): Promise<void> {
        await this.playerRepo.wipeAllPlayers();
    }
}
