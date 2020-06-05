import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Yonghu } from './yonghu';

@Entity()
export class Juese
{
  @PrimaryGeneratedColumn()
  id: number;

  // 名称
  @Column({ width: 50, nullable: false, unique: true })
  mingcheng: string;

  // 名称
  @Column({ width: 200, nullable: false, unique: true })
  shuoming: string;

  @ManyToMany(() => Yonghu, yonghu => yonghu.jueses)
  yonghus: Yonghu[];
}