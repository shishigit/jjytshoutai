import {BaseEntity, BeforeInsert, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
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

    @Column({nullable: false, unique: true, comment: '名称'})
    mingcheng: string;

    @Column({nullable: false, comment: '说明'})
    shuoming: string;

    @Column({default: true, nullable: false, comment: '激活'})
    jihuo: boolean;

    @ManyToMany(() => Yonghu, yonghu => yonghu.jueses)
    yonghus: Yonghu[];

    @ManyToMany(() => Jiekou, jiekou => jiekou.jueses)
    @JoinTable({name: 'juese_jiekou'})
    jiekous: Jiekou[];

    @BeforeInsert()
    beforeinsert()
    {
        if (this.shuoming && this.shuoming.length > 200) throw new YichangTishi('说明的长度不应大于200')
        if (this.mingcheng && this.mingcheng.length > 50) throw new YichangTishi('名称的长度不应大于200')
    }
}
