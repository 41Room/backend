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
import { CommunityService } from './community.service';
import { CreateCommunityDTO } from './dto';
import { Response } from 'express';
import { UpdateCommunityDTO } from './dto';

@Controller('community')
export class CommunityController {
  constructor(private communityService: CommunityService) {}

  @Post()
  async createCommunity(
    @Res() res: Response,
    @Body() body: CreateCommunityDTO,
  ) {
    try {
      const result = await this.communityService.createCommunity(body);
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

  @Get('/list/:building_id')
  async getCommunityList(
    @Res() res: Response,
    @Param('building_id') building_id: string,
  ) {
    try {
      const result = await this.communityService.getCommunityList(building_id);
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

  @Get('/:community_id')
  async getCommunity(
    @Res() res: Response,
    @Param('community_id') community_id: string,
  ) {
    try {
      const result = await this.communityService.getCommunity(community_id);
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
  async upadateCommunity(
    @Res() res: Response,
    @Body() body: UpdateCommunityDTO,
  ) {
    try {
      const result = await this.communityService.updateCommunity(body);
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

  @Delete('/:community_id')
  async deleteCommunity(@Res() res: Response, @Param() community_id: string) {
    try {
      const result = await this.communityService.deleteCommunity(community_id);
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
