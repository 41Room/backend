import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePlantDTO {
  @IsNotEmpty()
  @IsString()
  plant_id: string;

  @IsOptional()
  @IsString()
  plant_nm?: string;

  @IsOptional()
  @IsString()
  plant_desc?: string;

  @IsOptional()
  @IsString()
  plant_img?: string;

  @IsOptional()
  @IsNumber()
  plant_fee?: number;
}
