export enum FactionRole {
    LEADER = 'leader',
    MEMBER = 'member',
    OFFICER = 'officer',
}

export enum FactionStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DISBANDED = 'disbanded',
}

export interface FactionMember {
    playerId: string;
    playerName: string;
    role: FactionRole;
    joinedAt: Date;
}

export interface Faction {
    id: number;
    name: string;
    description: string;
    members: FactionMember[];
    status: FactionStatus;
    createdAt: Date;
}
