import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReviewDTO {
  @IsOptional()
  @IsString()
  review_id?: string;

  @IsNotEmpty()
  @IsString()
  plant_id: string;

  @IsNotEmpty()
  @IsString()
  tenant_id: string;

  @IsNotEmpty()
  @IsString()
  review_content: string;

  @IsNotEmpty()
  @IsNumber()
  review_grade: number;
}
