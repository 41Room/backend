import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCommunityDTO {
  @IsNotEmpty()
  @IsString()
  community_id: string;

  @IsOptional()
  @IsString()
  community_title?: string;

  @IsOptional()
  @IsString()
  community_content?: string;

  @IsOptional()
  @IsString()
  contract_addr?: string;
}
