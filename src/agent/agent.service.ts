import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon from 'argon2';
import { AgentEntity } from 'src/entity';
import { CreateAgentDTO, UpdateAgentDTO } from './dto';
import { AgentSigninDTO } from 'src/auth/dto';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(AgentEntity)
    private agentRepository: Repository<AgentEntity>,
  ) {}

  /**
   * 대리인 등록
   * --
   * @param agentInfo
   * @returns
   */
  async createAgent(agentInfo: CreateAgentDTO) {
    try {
      const result = await this.agentRepository.save(agentInfo);
      // const { agent_login_pw } = agentInfo;
      // const hash = await argon.hash(agent_login_pw);
      // const result = await this.agentRepository.save({
      //   ...agentInfo,
      //   agent_login_pw: hash,
      // });

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 대리인 목록 조회
   * --
   * @returns
   */
  async getAgentList() {
    try {
      const result = await this.agentRepository.find({
        select: [
          'agent_id',
          'agent_login_id',
          'agent_nm',
          'created_at',
          'modified_at',
          'building_id',
        ],
        relations: ['building'],
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 건물별 대리인 조회
   * --
   * @param building_id
   * @returns
   */
  async getAgentByBuilding(building_id: string) {
    try {
      const result = await this.agentRepository.find({
        where: { building_id },
      });
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
  async signinAgent(agentInfo: AgentSigninDTO) {
    try {
      const { agent_login_id, agent_login_pw } = agentInfo;
      const result = await this.agentRepository.findOneOrFail({
        where: { agent_login_id, agent_login_pw },
      });

      // const { agent_login_pw: pw } = result;
      // const isMatch = await argon.verify(pw, agent_login_pw);

      // if (!isMatch) {
      //   throw new Error('비밀번호가 일치하지 않습니다.');
      // }

      delete result.agent_login_pw;

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 대리인 상세 조회
   * --
   * @param agent_id
   * @returns
   */
  async getAgent(agent_id: string) {
    try {
      const result = await this.agentRepository.findOne({
        where: { agent_id },
        relations: ['building'],
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 대리인 수정
   * --
   * @param agentInfo
   * @returns
   */
  async updateAgent(agentInfo: UpdateAgentDTO) {
    try {
      const { agent_id, ...updateInfo } = agentInfo;

      if (updateInfo.agent_login_pw) {
        const hash = await argon.hash(updateInfo.agent_login_pw);
        updateInfo.agent_login_pw = hash;
      }

      const result = await this.agentRepository.update(
        { agent_id },
        updateInfo,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 대리인 정보 삭제
   * --
   * @param agent_id
   * @returns
   */
  async deleteAgent(agent_id: string) {
    try {
      const result = await this.agentRepository.delete({ agent_id });
      return result;
    } catch (e) {
      throw e;
    }
  }
}
