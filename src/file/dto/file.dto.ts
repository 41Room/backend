import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FileDTO {
  @IsOptional()
  @IsString()
  file_id?: string;

  @IsNotEmpty()
  @IsString()
  file_path: string;

  @IsOptional()
  @IsString()
  file_nm?: string;
}
