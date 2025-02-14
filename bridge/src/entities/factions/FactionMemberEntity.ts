import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "faction_members" })
export class FactionMemberEntity {
    @PrimaryGeneratedColumn("uuid")
    memberId: string;

    @Column()
    playerId: string;

    @Column()
    factionId: number;

    @Column()
    role: string;

    @Column({ type: "timestamptz" })
    joinedAt: Date;
}
