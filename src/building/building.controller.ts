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
import { BuildingService } from './building.service';
import { CreateBuildingDTO, UpdateBuildingDTO } from './dto';

@Controller('building')
export class BuildingController {
  constructor(private readonly buildingService: BuildingService) {}

  @Post()
  async createBuilding(@Res() res: Response, @Body() body: CreateBuildingDTO) {
    try {
      const result = await this.buildingService.createBuilding(body);
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

  @Get('/')
  async getBuildingList(@Res() res: Response) {
    try {
      const result = await this.buildingService.getBuildingList();
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

  @Get('/:building_id')
  async getBuilding(
    @Res() res: Response,
    @Param('building_id') building_id: string,
  ) {
    try {
      const result = await this.buildingService.getBuilding(building_id);
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
  async updateBuilding(@Res() res: Response, @Body() body: UpdateBuildingDTO) {
    try {
      const result = await this.buildingService.updateBuilding(body);
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

  @Delete('/:building_id')
  async deleteBuilding(
    @Res() res: Response,
    @Param('building_id') building_id: string,
  ) {
    try {
      const result = await this.buildingService.deleteBuilding(building_id);
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
