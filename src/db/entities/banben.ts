import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

/**
 * 数据库版本
 */
@Entity()
export class Banben extends BaseEntity
{
  @PrimaryGeneratedColumn()
  id: number;

  // 版本号
  @Column({ nullable: false, unique: true })
  banbenhao: string;

  // 版本说明
  @Column({nullable: true})
  shuoming: string;
}
