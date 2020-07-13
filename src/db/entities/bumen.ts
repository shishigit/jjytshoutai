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

    @Column({comment: '备注'})
    beizhu: string

    @Column({nullable: false, comment: '名称'})
    mingcheng: string

    @TreeChildren()
    children: Bumen[];

    @TreeParent()
    parent: Bumen;

    @ManyToMany(() => Yonghu, yonghu => yonghu.bumens)
    @JoinTable({name: 'bumen_yonghu'})
    yonghus: Yonghu[];
}
