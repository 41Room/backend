import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityEntity } from 'src/entity/community.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCommunityDTO, UpdateCommunityDTO } from './dto';
import { VoteEntity } from 'src/entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityEntity)
    private communityRepository: Repository<CommunityEntity>,
    @InjectRepository(VoteEntity)
    private voteRepository: Repository<VoteEntity>,
    private dataSource: DataSource,
  ) {}

  /**
   * 커뮤니티 등록
   * --
   * @param communityInfo
   * @returns
   */
  async createCommunity(communityInfo: CreateCommunityDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      var result: any;
      await queryRunner.startTransaction();
      const { vote: voteInfo, ...createInfo } = communityInfo;
      const comm = this.communityRepository.create(createInfo);
      result = await queryRunner.manager.save(comm);

      if (voteInfo) {
        const _vote = this.voteRepository.create({
          ...voteInfo,
          community_id: result.community_id,
        });
        const vote = await queryRunner.manager.save(_vote);
        result = { ...result, vote };
      }

      await queryRunner.commitTransaction();

      return result;
    } catch (e) {
      console.log(e);
      await queryRunner.rollbackTransaction();
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
            tt.building_id = ?
        ORDER BY tc.created_at DESC`,
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
        relations: ['tenant', 'reply', 'vote'],
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
