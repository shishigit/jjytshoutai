import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 系统用户
 */
@Entity()
export class Yonghu extends BaseEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  // 账号
  @Column({ width: 50, nullable: false, unique: true })
  zhanghao: string;

  // 密码
  @Column({ width: 50, nullable: false })
  mima: string;

  // 激活
  @Column({ default: true, nullable: false })
  jihuo: boolean;
}
