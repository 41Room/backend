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
import { TenantService } from './tenant.service';
import { CreateTenantDTO, UpdateTenantDTO } from './dto';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  async createTenant(@Res() res: Response, @Body() body: CreateTenantDTO) {
    try {
      const result = await this.tenantService.createTenant(body);
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
  async getTenantList(
    @Res() res: Response,
    @Param('building_id') building_id: string,
  ) {
    try {
      const result = await this.tenantService.getTenantList(building_id);
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

  @Get('/:tenant_id')
  async getTenant(@Res() res: Response, @Param('tenant_id') tenant_id: string) {
    try {
      const result = await this.tenantService.getTenant(tenant_id);
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
  async updateTenant(@Res() res: Response, @Body() body: UpdateTenantDTO) {
    try {
      const result = await this.tenantService.updateTenant(body);
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

  @Delete('/:tenant_id')
  async deleteTenant(
    @Res() res: Response,
    @Param('tenant_id') tenant_id: string,
  ) {
    try {
      const result = await this.tenantService.deleteTenant(tenant_id);
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
