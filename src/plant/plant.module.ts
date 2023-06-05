import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlantEntity } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlantEntity])],
  controllers: [PlantController],
  providers: [PlantService],
})
export class PlantModule {}
