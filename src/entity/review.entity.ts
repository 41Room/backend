import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlantEntity } from './plant.entity';
import { TenantEntity } from './tenant.entity';

@Entity({ name: 't_review' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  review_id: string;

  @Column()
  review_content: string;

  @Column()
  review_grade: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @Column()
  plant_id: string;

  @Column()
  tenant_id: string;

  @ManyToOne(() => PlantEntity, (plant) => plant.plant_id)
  @JoinColumn({ name: 'plant_id' })
  plant: PlantEntity;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.tenant_id)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantEntity;
}
