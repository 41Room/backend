import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BuildingEntity } from './building.entity';

@Entity({ name: 't_tenant' })
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  tenant_id: string;

  @Column({ unique: true })
  tenant_login_id: string;

  @Column()
  tenant_login_pw: string;

  @Column()
  tenant_nm: string;

  @Column()
  tenant_dong: string;

  @Column()
  tenant_ho: string;

  @Column()
  wallet_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @Column()
  building_id: string;

  @ManyToOne(() => BuildingEntity, (building) => building.building_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'building_id' })
  building: BuildingEntity;
}
