import {BaseEntity, Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Yonghu} from './yonghu';
import {Jiekou} from './jiekou';

/**
 * 角色
 */
@Entity()
export class Juese extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => Jiekou, jiekou => jiekou.jueses)
    @JoinTable({name: 'juese_jiekou'})
    jiekous: Jiekou[];

    // 激活
    @Column({default: true, nullable: false})
    jihuo: boolean;

    // 名称
    @Column({width: 50, nullable: false})
    @Index('uk_juese_mingcheng', {unique: true})
    mingcheng: string;

    // 说明
    @Column({width: 200, nullable: false})
    shuoming: string;

    @ManyToMany(() => Yonghu, yonghu => yonghu.jueses)
    yonghus: Yonghu[];
}
