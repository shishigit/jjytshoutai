import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}