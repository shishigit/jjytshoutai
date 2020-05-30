import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Yonghu
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}