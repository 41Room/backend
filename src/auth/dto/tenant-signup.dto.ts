import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TenantSignupDTO {
  @IsOptional()
  @IsString()
  tenant_id?: string;

  @IsNotEmpty()
  @IsString()
  tenant_login_id: string;

  @IsNotEmpty()
  @IsString()
  tenant_login_pw: string;

  @IsNotEmpty()
  @IsString()
  tenant_nm: string;

  @IsNotEmpty()
  @IsString()
  tenant_dong: string;

  @IsNotEmpty()
  @IsString()
  tenant_ho: string;

  @IsNotEmpty()
  @IsString()
  building_id: string;

  @IsOptional()
  @IsString()
  wallet_addr?: string;
}
