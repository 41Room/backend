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
import { BuildingEntity } from './building.entity';
import { ReviewEntity } from './review.entity';

@Entity({ name: 't_plant' })
export class PlantEntity {
  @PrimaryGeneratedColumn('uuid')
  plant_id: string;

  @Column()
  plant_nm: string;

  @Column()
  plant_desc: string;

  @Column()
  plant_img: string;

  @Column()
  plant_fee: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;

  @Column()
  building_id: string;

  @ManyToOne(() => BuildingEntity, (building) => building.building_id)
  @JoinColumn({ name: 'building_id' })
  building: BuildingEntity;

  @OneToMany(() => ReviewEntity, (review) => review.plant)
  review: ReviewEntity[];
}
