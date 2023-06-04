import { Module } from '@nestjs/common';
import { AgentController } from './agent.controller';
import { AgentService } from './agent.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentEntity } from 'src/entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgentEntity])],
  providers: [AgentService],
  controllers: [AgentController],
  exports: [AgentService],
})
export class AgentModule {}
