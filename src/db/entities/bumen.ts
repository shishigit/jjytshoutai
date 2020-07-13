import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent
} from "typeorm";
import {Yonghu} from "./yonghu";

@Entity()
@Tree("materialized-path")
export class Bumen extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    beizhu: string

    @Column({nullable: false})
    mingcheng: string

    @ManyToMany(() => Yonghu, yonghu => yonghu.bumens)
    @JoinTable({name: 'bumen_yonghu'})
    yonghus: Yonghu[];

    @TreeChildren()
    children: Bumen[];

    @TreeParent()
    parent: Bumen;
}
