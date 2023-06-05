import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlantEntity } from 'src/entity';
import { CreatePlantDTO, UpdatePlantDTO } from './dto';

@Injectable()
export class PlantService {
  constructor(
    @InjectRepository(PlantEntity)
    private plantRepository: Repository<PlantEntity>,
  ) {}

  /**
   * 시설 등록
   * --
   * @param plantInfo
   * @returns
   */
  async createPlant(plantInfo: CreatePlantDTO) {
    try {
      const result = await this.plantRepository.save(plantInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 시설 목록 조회
   * --
   * @param building_id
   * @returns
   */
  async getPlantList(building_id: string) {
    try {
      const result = await this.plantRepository.find({
        where: { building_id },
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 시설 상세 조회
   * --
   * @param plant_id
   * @returns
   */
  async getPlant(plant_id: string) {
    try {
      const result = await this.plantRepository.findOne({
        where: { plant_id },
        relations: ['building'],
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 시설 정보 수정
   * --
   * @param plantInfo
   * @returns
   */
  async updatePlant(plantInfo: UpdatePlantDTO) {
    try {
      const { plant_id, ...updateInfo } = plantInfo;
      const result = await this.plantRepository.update(
        { plant_id },
        updateInfo,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 시설 삭제
   * --
   * @param plant_id
   * @returns
   */
  async deletePlant(plant_id: string) {
    try {
      const result = await this.plantRepository.delete(plant_id);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
