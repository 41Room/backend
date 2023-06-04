import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTenantDTO {
  @IsNotEmpty()
  @IsString()
  tenant_id: string;

  @IsOptional()
  @IsString()
  tenant_login_pw?: string;

  @IsOptional()
  @IsString()
  tenant_nm?: string;

  @IsOptional()
  @IsString()
  wallet_id?: string;
}
