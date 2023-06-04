import { Module } from '@nestjs/common';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { BuildingEntity } from 'src/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentModule } from 'src/agent/agent.module';

@Module({
  imports: [TypeOrmModule.forFeature([BuildingEntity]), AgentModule],
  controllers: [BuildingController],
  providers: [BuildingService],
})
export class BuildingModule {}
