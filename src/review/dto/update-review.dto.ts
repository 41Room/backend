import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateReviewDTO {
  @IsNotEmpty()
  @IsString()
  review_id: string;

  @IsOptional()
  @IsString()
  review_content?: string;

  @IsOptional()
  @IsNumber()
  review_grade?: number;
}
