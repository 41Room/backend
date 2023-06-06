import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TenantEntity } from './tenant.entity';

@Entity({ name: 't_community' })
export class CommunityEntity {
  @PrimaryGeneratedColumn('uuid')
  community_id: string;

  @Column()
  community_title: string;

  @Column()
  community_content: string;

  @Column()
  contract_addr: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @Column()
  tenant_id: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.tenant_id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;
}
