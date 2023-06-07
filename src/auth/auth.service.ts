import { Injectable } from '@nestjs/common';
import { AgentService } from 'src/agent/agent.service';
import { TenantService } from 'src/tenant/tenant.service';
import { CreateAgentDTO } from 'src/agent/dto';
import { AgentSigninDTO, TenantSigninDTO } from './dto';
import { CreateTenantDTO } from 'src/tenant/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly tenantService: TenantService,
    private readonly agentService: AgentService,
  ) {}

  /**
   * 대리인 회원가입
   * --
   * @param agentInfo
   * @returns
   */
  async signupAgent(agentInfo: CreateAgentDTO) {
    try {
      const result = await this.agentService.createAgent(agentInfo);
      delete result.agent_login_pw;
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 대리인 로그인
   * --
   * @param agentInfo
   * @returns
   */
  async singinAgent(agentInfo: AgentSigninDTO) {
    try {
      const result = await this.agentService.signinAgent(agentInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 세대 회원가입
   * --
   * @param tenantInfo
   * @returns
   */
  async signupTenant(tenantInfo: CreateTenantDTO) {
    try {
      const result = await this.tenantService.createTenant(tenantInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 세대 로그인
   * --
   * @param tenatInfo
   * @returns
   */
  async signinTenant(tenatInfo: TenantSigninDTO) {
    try {
      const result = await this.tenantService.signinTenant(tenatInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
