import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePlantDTO {
  @IsOptional()
  @IsString()
  plant_id?: string;

  @IsNotEmpty()
  @IsString()
  building_id: string;

  @IsNotEmpty()
  @IsString()
  plant_nm: string;

  @IsOptional()
  @IsString()
  plant_desc?: string;

  @IsNotEmpty()
  @IsString()
  plant_img: string;

  @IsNotEmpty()
  @IsNumber()
  plant_fee: number;
}
