import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CommunityVoteDTO } from './community-vote.dto';

export class CreateCommunityDTO {
  @IsOptional()
  @IsString()
  community_id?: string;

  @IsNotEmpty()
  @IsString()
  community_title: string;

  @IsNotEmpty()
  @IsString()
  community_content: string;

  @IsOptional()
  @IsString()
  contract_addr: string;

  @IsNotEmpty()
  @IsString()
  tenant_id: string;

  @IsOptional()
  vote?: CommunityVoteDTO;
}
