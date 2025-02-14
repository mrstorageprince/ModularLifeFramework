// core/repositories/player/IPlayerRepository.ts
import { Player } from "../../models/player/PlayerTypes";

export interface IPlayerRepository {
    /**
     * Creates a new player.
     * @param playerName - The player's name.
     * @param factionId - Optional faction ID.
     * @returns A promise resolving to the created Player.
     */
    create(playerName: string, factionId?: number | null): Promise<Player>;

    /**
     * Finds a player by their unique identifier.
     * @param playerId - The player's unique ID.
     * @returns A promise resolving to the found Player or undefined if not found.
     */
    findById(playerId: string): Promise<Player | undefined>;

    /**
     * Updates an existing player's data.
     * @param playerId - The player's unique ID.
     * @param updates - Partial update to the player object.
     * @returns A promise resolving to the updated Player or undefined if not found.
     */
    update(playerId: string, updates: Partial<Player>): Promise<Player | undefined>;

    /**
     * Deletes a player by ID.
     * @param playerId - The player's unique ID.
     * @returns A promise resolving to true if deletion was successful.
     */
    delete(playerId: string): Promise<boolean>;

    /**
     * Retrieves all players.
     * @returns A promise resolving to an array of all players.
     */
    findAll(): Promise<Player[]>;
}
