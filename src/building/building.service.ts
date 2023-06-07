import { Injectable } from '@nestjs/common';
import { CreateBuildingDTO, UpdateBuildingDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { AgentService } from 'src/agent/agent.service';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(BuildingEntity)
    private readonly buildingRepository: Repository<BuildingEntity>,
    private readonly agentService: AgentService,
  ) {}

  /**
   * 건물 등록
   * --
   * @param buildingInfo
   * @returns
   */
  async createBuilding(buildingInfo: CreateBuildingDTO) {
    try {
      const result = await this.buildingRepository.save(buildingInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 건물 전체 목록 조회
   * @returns
   */
  async getBuildingList() {
    try {
      const result = await this.buildingRepository.find({
        relations: ['agent', 'tenant', 'plant'],
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 건물 상세 정보 조회
   * --
   * @param building_id
   * @returns
   */
  async getBuilding(building_id: string) {
    try {
      const result = await this.buildingRepository.findOne({
        where: { building_id },
      });

      const agent = await this.agentService.getAgentByBuilding(building_id);

      return { ...result, agent };
    } catch (e) {
      throw e;
    }
  }

  /**
   * 건물 정보 수정
   * --
   * @param buildingInfo
   * @returns
   */
  async updateBuilding(buildingInfo: UpdateBuildingDTO) {
    try {
      const { building_id, ...updateInfo } = buildingInfo;
      const result = await this.buildingRepository.update(
        building_id,
        updateInfo,
      );

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 건물 정보 삭제
   * --
   * @param building_id
   * @returns
   */
  async deleteBuilding(building_id: string) {
    try {
      const result = await this.buildingRepository.delete(building_id);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
