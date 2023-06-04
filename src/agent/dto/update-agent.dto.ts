import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAgentDTO {
  @IsNotEmpty()
  @IsString()
  agent_id: string;

  @IsOptional()
  @IsString()
  agent_login_pw?: string;

  @IsOptional()
  @IsString()
  agent_nm?: string;

  @IsOptional()
  @IsString()
  building_id?: string;
}
