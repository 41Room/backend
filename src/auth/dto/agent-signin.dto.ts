import { IsOptional, IsString } from 'class-validator';

export class AgentSigninDTO {
  @IsOptional()
  @IsString()
  agent_login_id?: string;

  @IsOptional()
  @IsString()
  agent_login_pw?: string;

  @IsOptional()
  @IsString()
  wallet_addr?: string;
}
