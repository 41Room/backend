import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateVoteDTO } from './dto/create-vote.dto';
import { UpdateVoteDTO } from './dto/update-vote.dto';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteEntity)
    private voteRepository: Repository<VoteEntity>,
  ) {}

  /**
   * 투표 등록
   * --
   * @param voteInfo
   * @returns
   */
  async createVote(voteInfo: CreateVoteDTO) {
    try {
      const result = await this.voteRepository.save(voteInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 투표 전체 목록 조회
   * --
   * @returns
   */
  async getVoteList() {
    try {
      const result = await this.voteRepository.find();
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 투표 조회
   * --
   * @param vote_id
   * @returns
   */
  async getVote(vote_id: string) {
    try {
      const result = await this.voteRepository.findOne({ where: { vote_id } });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 투표 수정
   * --
   * @param voteInfo
   * @returns
   */
  async updateVote(voteInfo: UpdateVoteDTO) {
    try {
      const { vote_id, ...updateInfo } = voteInfo;
      const result = await this.voteRepository.update({ vote_id }, updateInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 투표 삭제
   * --
   * @param vote_id
   * @returns
   */
  async deleteVote(vote_id: string) {
    try {
      const result = await this.voteRepository.delete(vote_id);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
