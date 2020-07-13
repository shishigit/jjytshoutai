import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Yonghu} from "./yonghu";

@Entity()
export class Bumen extends BaseEntity
{
    @Column({width: 200})
    beizhu: string
    @PrimaryGeneratedColumn()
    id: number;
    @Column({width: 50, unique: true, nullable: false})
    mingcheng: string
    @ManyToMany(() => Yonghu, yonghu => yonghu.bumens)
    @JoinTable({name: 'bumen_yonghu'})
    yonghus: Yonghu[];
}
