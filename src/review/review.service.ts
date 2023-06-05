import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from 'src/entity';
import { Repository } from 'typeorm';
import { CreateReviewDTO, UpdateReviewDTO } from './dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(ReviewEntity)
    private reviewRepository: Repository<ReviewEntity>,
  ) {}

  /**
   * 리뷰 등록
   * --
   * @param reviewInfo
   * @returns
   */
  async createReview(reviewInfo: CreateReviewDTO) {
    try {
      const result = await this.reviewRepository.save(reviewInfo);
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 리뷰 목록 조회
   * --
   * @param plant_id
   * @returns
   */
  async getReviewList(plant_id: string) {
    try {
      const result = await this.reviewRepository.find({
        where: { plant_id },
        relations: ['tenant'],
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 리뷰 상세 조회
   * --
   * @param review_id
   * @returns
   */
  async getReview(review_id: string) {
    try {
      const result = await this.reviewRepository.findOne({
        where: { review_id },
        relations: ['plant', 'tenant'],
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 사용자별 리뷰 조회
   * --
   * @param tenant_id
   * @returns
   */
  async getReviewByTenant(tenant_id: string) {
    try {
      const result = await this.reviewRepository.find({
        where: { tenant_id },
        relations: ['plant', 'tenant'],
      });
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 리뷰 수정
   * --
   * @param reviewInfo
   * @returns
   */
  async updateReview(reviewInfo: UpdateReviewDTO) {
    try {
      const { review_id, ...updateInfo } = reviewInfo;
      const result = await this.reviewRepository.update(
        { review_id },
        updateInfo,
      );
      return result;
    } catch (e) {
      throw e;
    }
  }

  /**
   * 리뷰 삭제
   * --
   * @param review_id
   * @returns
   */
  async deleteReview(review_id: string) {
    try {
      const result = await this.reviewRepository.delete(review_id);
      return result;
    } catch (e) {
      throw e;
    }
  }
}
