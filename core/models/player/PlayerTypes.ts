export interface Player {
    playerId: string;         // Unique identifier (e.g., UUID)
    playerName: string;       // Display name for the player
    factionId: number | null; // Associated faction ID (null if not in a faction)
    moneyBalance: number;     // Current balance (for future transactions)
    isPolice: boolean;        // Whether the player is on police duty
    lastLogin: Date;          // Last login timestamp
    createdAt: Date;          // Timestamp when the player was created
}
