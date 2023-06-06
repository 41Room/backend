import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from 'src/entity/community.entity';
import { Repository } from 'typeorm';
import { CreateCommunityDTO, UpdateCommunityDTO } from './dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private communityRepository: Repository<CommunityEntity>,
  ) {}

  /**
   * 커뮤니티 등록
   * --
   * @param communityInfo
   * @returns
   */
  async createCommunity(communityInfo: CreateCommunityDTO) {
    try {
      const result = await this.communityRepository.save(communityInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 커뮤니티 목록 조회
   * --
   * @returns
   */
  async getCommunityList(building_id: string) {
    try {
      const result = await this.communityRepository.query(
        `SELECT
            tc.community_id,
            tc.tenant_id,
            tc.community_title,
            tc.community_content,
            tc.created_at,
            tc.modified_at,
            tc.contract_addr,
            tt.building_id,
            tt.tenant_id,
            tt.building_id,
            tt.tenant_login_id,
            tt.tenant_nm,
            tt.tenant_dong,
            tt.tenant_ho,
            tt.wallet_id
        FROM
            t_community tc
            INNER JOIN t_tenant tt ON tc.tenant_id = tt.tenant_id
            INNER JOIN t_building tb ON tb.building_id = tt.building_id
        WHERE
            tt.building_id = ?`,
        [`${building_id}`],
      );

      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  /**
   * 커뮤니티 조회
   * --
   * @param community_id
   * @returns
   */
  async getCommunity(community_id: string) {
    try {
      const result = await this.communityRepository.findOne({
        where: { community_id },
        relations: ['tenant'],
      });

      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 커뮤니티 수정
   * --
   * @param communityInfo
   * @returns
   */
  async updateCommunity(communityInfo: UpdateCommunityDTO) {
    try {
      const { community_id, ...updateInfo } = communityInfo;
      const result = await this.communityRepository.update(
        { community_id },
        updateInfo,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 커뮤니티 삭제
   * --
   * @param community_id
   * @returns
   */
  async deleteCommunity(community_id: string) {
    try {
      const result = await this.communityRepository.delete(community_id);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
