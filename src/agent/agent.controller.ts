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
import { AgentService } from './agent.service';
import { CreateAgentDTO, UpdateAgentDTO } from './dto';
@Controller('agent')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  async createAgent(@Res() res: Response, @Body() body: CreateAgentDTO) {
    try {
      const result = await this.agentService.createAgent(body);
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

  @Get()
  async getAgentList(@Res() res: Response) {
    try {
      const result = await this.agentService.getAgentList();
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

  @Get('/:agent_id')
  async getAgent(@Res() res: Response, @Param('agent_id') agent_id: string) {
    try {
      const result = await this.agentService.getAgent(agent_id);
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
  async updateAgent(@Res() res: Response, @Body() body: UpdateAgentDTO) {
    try {
      const result = await this.agentService.updateAgent(body);
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

  @Delete('/:agent_id')
  async deleteAgent(@Res() res: Response, @Param('agent_id') agent_id: string) {
    try {
      const result = await this.agentService.deleteAgent(agent_id);
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
