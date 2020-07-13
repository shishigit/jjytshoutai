import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Juese} from './juese';
import {Bumen} from "./bumen";

/**
 * 系统用户
 */
@Entity()
export class Yonghu extends BaseEntity
{
    @PrimaryGeneratedColumn({comment: 'ID'})
    id: number;

    // 账号
    @Column({nullable: false, unique: true})
    zhanghao: string;

    // 密码
    @Column({nullable: false})
    mima: string;

    // 激活
    @Column({default: true, nullable: false})
    jihuo: boolean;

    @ManyToMany(() => Juese, juese => juese.yonghus)
    @JoinTable({name: 'yonghu_juese'})
    jueses: Juese[];

    @ManyToMany(() => Bumen, bumen => bumen.yonghus)
    bumens: Bumen[];
}
