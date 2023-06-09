import { IsNotEmpty, IsString } from 'class-validator';

export class CommunityVoteDTO {
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
