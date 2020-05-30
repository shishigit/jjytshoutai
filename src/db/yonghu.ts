import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Yonghu extends BaseEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ width: 50, nullable: false, unique: true })
  zhanghao: string;

  @Column({ width: 50, nullable: false })
  mima: string;

  @Column({ default: true, nullable: false })
  jihuo: boolean;
}
