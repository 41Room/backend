import { Module } from '@nestjs/common';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { CommunityEntity } from 'src/entity/community.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyEntity, VoteEntity } from 'src/entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityEntity, ReplyEntity, VoteEntity]),
  ],
  controllers: [CommunityController],
  providers: [CommunityService],
})
export class CommunityModule {}
