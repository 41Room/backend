import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AgentSignupDTO {
  @IsOptional()
  @IsString()
  agent_id?: string;

  @IsNotEmpty()
  @IsString()
  agent_login_id: string;

  @IsNotEmpty()
  @IsString()
  agent_login_pw: string;

  @IsNotEmpty()
  @IsString()
  agent_nm: string;

  @IsNotEmpty()
  @IsString()
  building_id: string;

  @IsOptional()
  @IsString()
  wallet_addr?: string;
}
