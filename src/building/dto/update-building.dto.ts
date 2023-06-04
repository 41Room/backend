import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBuildingDTO {
  @IsNotEmpty()
  @IsString()
  building_id: string;

  @IsOptional()
  @IsString()
  building_title?: string;

  @IsOptional()
  @IsString()
  building_description?: string;

  @IsOptional()
  @IsString()
  contract_addr?: string;
}
