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

@Entity({ name: 't_agent' })
export class AgentEntity {
  @PrimaryGeneratedColumn('uuid')
  agent_id: string;

  @Column()
  agent_login_id: string;

  @Column()
  agent_login_pw: string;

  @Column()
  agent_nm: string;

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
