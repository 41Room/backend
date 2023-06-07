import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AgentEntity } from './agent.entity';
import { PlantEntity } from './plant.entity';
import { TenantEntity } from './tenant.entity';

@Entity({ name: 't_building' })
export class BuildingEntity {
  @PrimaryGeneratedColumn('uuid')
  building_id: string;
  @Column()
  building_title: string;

  @Column()
  building_description: string;

  @Column()
  contract_addr: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @OneToMany(() => AgentEntity, (agent) => agent.building)
  agent: AgentEntity[];

  @OneToMany(() => PlantEntity, (plant) => plant.building)
  plant: PlantEntity[];

  @OneToMany(() => TenantEntity, (tenant) => tenant.building)
  tenant: TenantEntity[];
}
