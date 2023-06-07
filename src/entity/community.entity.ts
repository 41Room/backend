import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { ReplyEntity } from './reply.entity';
import { VoteEntity } from './vote.entity';

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

  @OneToMany(() => ReplyEntity, (reply) => reply.community)
  reply: ReplyEntity[];

  @OneToMany(() => VoteEntity, (vote) => vote.community)
  vote: VoteEntity[];
}
