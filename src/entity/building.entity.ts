import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
