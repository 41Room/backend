import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CommunityEntity } from './community.entity';
import { VoteEntity } from './vote.entity';

@Entity({ name: 't_reply' })
export class ReplyEntity {
  @PrimaryGeneratedColumn('uuid')
  reply_id: string;

  @Column()
  reply_content: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @Column()
  community_id!: string;

  @Column()
  tenant_id: string;

  @ManyToOne(() => CommunityEntity, (community) => community.reply, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'community_id' })
  community!: CommunityEntity;
}
