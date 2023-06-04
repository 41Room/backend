import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { BuildingModule } from './building/building.module';
import { AgentModule } from './agent/agent.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '.env'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [DbModule],
      useClass: DbService,
      inject: [DbService],
    }),
    DbModule,
    BuildingModule,
    AgentModule,
    TenantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
