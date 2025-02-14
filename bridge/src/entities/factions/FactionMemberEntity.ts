import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FactionEntity } from './FactionEntity';

@Entity()
export class FactionMemberEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    playerId!: string;

    @Column()
    playerName!: string;

    @Column()
    role!: string;

    @ManyToOne(() => FactionEntity, (faction) => faction.members)
    faction!: FactionEntity;
}
