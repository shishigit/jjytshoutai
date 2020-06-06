import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RequestMethod } from '@nestjs/common';
import { JianQuanLeixing } from '../config/changliang';
import { Juese } from './juese';

/**
 * 系统提供的接口
 */
@Entity()
export class Jiekou extends BaseEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  // 请求方法
  @Column()
  method: 'post' | 'get' | 'all';

  // URL
  @Column({ nullable: false, unique: true })
  url: string;

  // 分组
  @Column({ nullable: false })
  fenzu: string;

  // 说明
  @Column({ nullable: false })
  shuoming: string;

  // 启用与否
  @Column({ nullable: false })
  qiyong: boolean;

  // 鉴权类型
  @Column({ nullable: false })
  jianquan: JianQuanLeixing;

  @ManyToMany(type => Juese, juese => juese.jiekous)
  jueses: Juese[];

  constructor(
    url: string,
    method: RequestMethod,
    fenzu: string,
    shuoming: string,
    qiyong: boolean,
    jianquan: JianQuanLeixing)
  {
    super();

    this.url = url;
    if (method === RequestMethod.POST) this.method = 'post';
    if (method === RequestMethod.GET) this.method = 'get';
    if (method === RequestMethod.ALL) this.method = 'all';
    this.fenzu = fenzu;
    this.shuoming = shuoming;
    this.qiyong = qiyong;
    this.jianquan = jianquan;
  }
}