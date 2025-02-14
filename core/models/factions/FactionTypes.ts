export interface Faction {
    factionId: number;
    name: string;
    description: string;
    treasuryId: string;
    createdAt: Date;
    coalitionId?: string; // Optional; only one coalition allowed
}

export interface FactionMember {
    memberId: string;
    playerId: string;
    factionId: number;
    role: 'leader' | 'officer' | 'member';
    joinedAt: Date;
}

export interface Coalition {
    coalitionId: string;
    name: string;
    description: string;
    treasuryId: string;
    factionIds: number[];
    createdAt: Date;
}
