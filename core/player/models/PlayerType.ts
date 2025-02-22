/**
 * Defines the structure of a player in the system.
 */
export type ExternalIDs = {
    arma3?: string;
    reforger?: string;
    gta5?: string;
};

export interface Player {
    playerId: string;
    username: string;
    email: string;
    displayName: string;
    externalIds?: ExternalIDs;
}
