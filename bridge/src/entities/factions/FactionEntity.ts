import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "factions" })
export class FactionEntity {
    @PrimaryGeneratedColumn()
    factionId: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    treasuryId: string;

    @Column({ nullable: true })
    coalitionId?: string;

    @Column({ type: "timestamptz" })
    createdAt: Date;
}
