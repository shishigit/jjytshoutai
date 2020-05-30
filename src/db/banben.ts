import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Banben extends BaseEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  banbenhao: string;

  @Column({ width: 200, nullable: true })
  shuoming: string;
}