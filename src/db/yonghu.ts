import {BaseEntity, Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Juese} from './juese';

/**
 * 系统用户
 */
@Entity()
export class Yonghu extends BaseEntity
{
    @PrimaryGeneratedColumn()
    id: number;

    // 账号
    @Column({width: 50, nullable: false})
    @Index('uk_yonghuzhanghao', {unique: true})
    zhanghao: string;

    // 密码
    @Column({width: 50, nullable: false})
    mima: string;

    // 激活
    @Column({default: true, nullable: false})
    jihuo: boolean;

    @ManyToMany(() => Juese, juese => juese.yonghus)
    @JoinTable({name: 'yonghu_juese'})
    jueses: Juese[];
}
