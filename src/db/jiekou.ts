import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Jiekou
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  url: string;

  @Column({ nullable: false })
  method: 'post' | 'get';
}