// core/entities/PlayerEntity.ts
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "players" })
export class PlayerEntity {
    @PrimaryColumn()
    playerId: string;

    @Column()
    playerName: string;

    @Column({ type: "int", nullable: true })
    factionId: number | null;

    @Column({ type: "int", default: 0 })
    moneyBalance: number;

    @Column({ default: false })
    isPolice: boolean;

    @Column({ type: "timestamptz" })
    lastLogin: Date;

    @Column({ type: "timestamptz" })
    createdAt: Date;
}
