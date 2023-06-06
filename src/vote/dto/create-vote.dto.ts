import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVoteDTO {
  @IsOptional()
  @IsString()
  vote_id?: string;

  @IsNotEmpty()
  @IsString()
  community_id: string;

  @IsNotEmpty()
  @IsString()
  vote_title: string;

  @IsNotEmpty()
  @IsString()
  vote_description: string;

  @IsNotEmpty()
  @IsString()
  vote_start: Date;

  @IsNotEmpty()
  @IsString()
  vote_end: Date;
}
