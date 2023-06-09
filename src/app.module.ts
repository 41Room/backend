import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import { DbModule } from './db/db.module';
import { DbService } from './db/db.service';
import { BuildingModule } from './building/building.module';
import { AgentModule } from './agent/agent.module';
import { TenantModule } from './tenant/tenant.module';
import { PlantModule } from './plant/plant.module';
import { ReviewModule } from './review/review.module';
import { FileModule } from './file/file.module';
import { AuthModule } from './auth/auth.module';
import { CommunityModule } from './community/community.module';
import { VoteModule } from './vote/vote.module';
import { PurchaseModule } from './purchase/purchase.module';
import { Web3Module } from './web3/web3.module';

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
    PlantModule,
    ReviewModule,
    FileModule,
    AuthModule,
    CommunityModule,
    VoteModule,
    PurchaseModule,
    Web3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
