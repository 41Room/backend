import { IsOptional, IsString } from 'class-validator';

export class TenantSigninDTO {
  @IsOptional()
  @IsString()
  tenant_login_id?: string;

  @IsOptional()
  @IsString()
  tenant_login_pw?: string;

  @IsOptional()
  @IsString()
  wallet_addr?: string;
}
