import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Yonghu
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zhanghao: string;

  @Column()
  mima: string;

  @Column({ default: true })
  jihuo: boolean;
}
