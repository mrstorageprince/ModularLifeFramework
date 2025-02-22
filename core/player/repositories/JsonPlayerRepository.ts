import { IPlayerRepository } from "./IPlayerRepository";
import { Player } from "../models/PlayerType";
import { JSONStorage } from "../../../utils/jsonStorage";

export class JsonPlayerRepository implements IPlayerRepository {
    private storage = new JSONStorage<Player>("storage/players.json");

    async createPlayer(player: Player): Promise<Player> {
        const players = await this.storage.read();
        players.push(player);
        await this.storage.write(players);
        return player;
    }

    async getPlayer(playerId: string): Promise<Player | null> {
        const players = await this.storage.read();
        return players.find(p => p.playerId === playerId) || null;
    }

    async deletePlayer(playerId: string): Promise<boolean> {
        const players = await this.storage.read();
        const updatedPlayers = players.filter(p => p.playerId !== playerId);
        await this.storage.write(updatedPlayers);
        return updatedPlayers.length < players.length;
    }

    async getAllPlayers(): Promise<Player[]> {
        return this.storage.read();
    }

    /**
     * Deletes all players from JSON storage (Admin function).
     */
    async wipeAllPlayers(): Promise<void> {
        await this.storage.write([]); // Clear the JSON file
    }
}
