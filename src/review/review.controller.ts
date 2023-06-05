import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ReviewService } from './review.service';
import { CreateReviewDTO, UpdateReviewDTO } from './dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(@Res() res: Response, @Body() body: CreateReviewDTO) {
    try {
      const result = await this.reviewService.createReview(body);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Get('/list/:plant_id')
  async getReviewList(
    @Res() res: Response,
    @Param('plant_id') plant_id: string,
  ) {
    try {
      const result = await this.reviewService.getReviewList(plant_id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Get('/:review_id')
  async getReview(@Res() res: Response, @Param('review_id') review_id: string) {
    try {
      const result = await this.reviewService.getReview(review_id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Get('/tenant/:tenant_id')
  async getReviewByTenant(
    @Res() res: Response,
    @Param('tenant_id') tenant_id: string,
  ) {
    try {
      const result = await this.reviewService.getReviewByTenant(tenant_id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Put()
  async updateReview(@Res() res: Response, @Body() body: UpdateReviewDTO) {
    try {
      const result = await this.reviewService.updateReview(body);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Delete('/:review_id')
  async deleteReview(
    @Res() res: Response,
    @Param('review_id') review_id: string,
  ) {
    try {
      const result = await this.reviewService.deleteReview(review_id);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }
}
