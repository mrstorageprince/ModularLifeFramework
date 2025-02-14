import { IPlayerRepository } from "../../repositories/player/IPlayerRepository";
import { Player } from "../../models/player/PlayerTypes";

export class PlayerManager {
    private repository: IPlayerRepository;

    constructor(repository: IPlayerRepository) {
        this.repository = repository;
    }

    /**
     * Creates a new player.
     * @param playerName - The player's name.
     * @param factionId - (Optional) The player's faction ID.
     * @returns A promise that resolves to the created Player.
     */
    async createPlayer(playerName: string, factionId?: number): Promise<Player> {
        return this.repository.create(playerName, factionId ?? null);
    }

    /**
     * Retrieves a player by ID.
     * @param playerId - The player's unique identifier.
     * @returns A promise that resolves to the Player or undefined if not found.
     */
    async getPlayer(playerId: string): Promise<Player | undefined> {
        return this.repository.findById(playerId);
    }

    /**
     * Updates a player's information.
     * @param playerId - The player's unique identifier.
     * @param updates - An object with the fields to update.
     * @returns A promise that resolves to the updated Player or undefined if not found.
     */
    async updatePlayer(playerId: string, updates: Partial<Player>): Promise<Player | undefined> {
        return this.repository.update(playerId, updates);
    }

    /**
     * Deletes a player.
     * @param playerId - The player's unique identifier.
     * @returns A promise that resolves to true if deletion was successful.
     */
    async deletePlayer(playerId: string): Promise<boolean> {
        return this.repository.delete(playerId);
    }

    /**
     * Retrieves all players.
     * @returns A promise that resolves to an array of all Players.
     */
    async getAllPlayers(): Promise<Player[]> {
        return this.repository.findAll();
    }
}
