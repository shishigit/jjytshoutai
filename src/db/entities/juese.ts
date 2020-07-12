import {BaseEntity, BeforeInsert, Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Yonghu} from './yonghu';
import {Jiekou} from './jiekou';
import {YichangTishi} from "../../config/yichang";

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

    @BeforeInsert()
    beforeinsert()
    {
        if (this.shuoming && this.shuoming.length > 200) throw new YichangTishi('说明的长度不应大于200')
        if (this.mingcheng && this.mingcheng.length > 50) throw new YichangTishi('名称的长度不应大于200')
    }
}
