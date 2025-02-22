import { Player } from "../models/PlayerType";

/**
 * Interface defining the methods for a player repository.
 * This allows switching between different storage implementations (JSON, Postgres).
 */
export interface IPlayerRepository {
    createPlayer(player: Player): Promise<Player>;
    getPlayer(playerId: string): Promise<Player | null>;
    deletePlayer(playerId: string): Promise<boolean>;
    getAllPlayers(): Promise<Player[]>;
}