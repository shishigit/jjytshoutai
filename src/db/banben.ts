import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Banben
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  banbenhao: string;

  @Column({ width: 200 })
  shuoming: string;
}