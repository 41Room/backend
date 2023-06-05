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
import { PlantService } from './plant.service';
import { CreatePlantDTO, UpdatePlantDTO } from './dto';

@Controller('plant')
export class PlantController {
  constructor(private readonly plantService: PlantService) {}

  @Post()
  async createPlant(@Res() res: Response, @Body() body: CreatePlantDTO) {
    try {
      const result = await this.plantService.createPlant(body);
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
  async getPlantList(
    @Res() res: Response,
    @Param('building_id') building_id: string,
  ) {
    try {
      const result = await this.plantService.getPlantList(building_id);
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

  @Get('/:plant_id')
  async getPlant(@Res() res: Response, @Param('plant_id') plant_id: string) {
    try {
      const result = await this.plantService.getPlant(plant_id);
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
  async updatePlant(@Res() res: Response, @Body() body: UpdatePlantDTO) {
    try {
      const result = await this.plantService.updatePlant(body);
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

  @Delete('/:plant_id')
  async deletePlant(@Res() res: Response, @Param('plant_id') plant_id: string) {
    try {
      const result = await this.plantService.deletePlant(plant_id);
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
