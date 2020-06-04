import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RequestMethod } from '@nestjs/common';

@Entity()
export class Jiekou extends BaseEntity
{
  @Column()
  method: 'post' | 'get' | 'all';

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  url: string;
  @Column({ nullable: false })
  fenzu: string;
  @Column({ nullable: false })
  shuoming: string;
  @Column({ nullable: false })
  qiyong: boolean;

  constructor(url: string, method: RequestMethod, fenzu: string, shuoming: string, qiyong: boolean)
  {
    super();

    this.url = url;
    if (method === RequestMethod.POST) this.method = 'post';
    if (method === RequestMethod.GET) this.method = 'get';
    if (method === RequestMethod.ALL) this.method = 'all';
    this.fenzu = fenzu;
    this.shuoming = shuoming;
    this.qiyong = qiyong;
  }
}