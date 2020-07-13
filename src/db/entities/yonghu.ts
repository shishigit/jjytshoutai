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

    @Column({nullable: false, unique: true, comment: '账号'})
    zhanghao: string;

    @Column({nullable: false, comment: '密码'})
    mima: string;

    @Column({default: true, nullable: false, comment: '激活'})
    jihuo: boolean;

    @ManyToMany(() => Juese, juese => juese.yonghus)
    @JoinTable({name: 'yonghu_juese'})
    jueses: Juese[];

    @ManyToMany(() => Bumen, bumen => bumen.yonghus)
    bumens: Bumen[];
}
