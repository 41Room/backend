import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBuildingDTO {
  @IsOptional()
  @IsString()
  building_id?: string;

  @IsNotEmpty()
  @IsString()
  building_title: string;

  @IsNotEmpty()
  @IsString()
  building_description: string;

  @IsOptional()
  @IsString()
  contract_addr?: string;
}
