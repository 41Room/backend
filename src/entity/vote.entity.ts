import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CommunityEntity } from './community.entity';

@Entity({ name: 't_vote' })
export class VoteEntity {
  @PrimaryGeneratedColumn('uuid')
  vote_id: string;

  @Column()
  vote_title: string;

  @Column()
  vote_description: string;

  @Column()
  vote_start: Date;

  @Column()
  vote_end: Date;

  @Column()
  community_id: string;

  @ManyToOne(() => CommunityEntity, (community) => community.community_id)
  @JoinColumn({ name: 'community_id' })
  community: CommunityEntity;
}
