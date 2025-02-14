import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FactionMemberEntity } from './FactionMemberEntity';

@Entity()
export class FactionEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    description!: string;

    @OneToMany(() => FactionMemberEntity, (member) => member.faction)
    members!: FactionMemberEntity[];

    @Column({ default: 'active' })
    status!: string;

    @Column()
    createdAt!: Date;
}
