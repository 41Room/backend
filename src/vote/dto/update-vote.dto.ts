import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateVoteDTO {
  @IsNotEmpty()
  @IsString()
  vote_id: string;

  @IsOptional()
  @IsString()
  vote_title?: string;

  @IsOptional()
  @IsString()
  vote_description?: string;

  @IsOptional()
  @IsString()
  vote_start?: Date;

  @IsOptional()
  @IsString()
  vote_end?: Date;
}
