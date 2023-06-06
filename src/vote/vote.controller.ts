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
import { VoteService } from './vote.service';
import { CreateVoteDTO } from './dto/create-vote.dto';
import { Response } from 'express';
import { UpdateVoteDTO } from './dto/update-vote.dto';

@Controller('vote')
export class VoteController {
  constructor(private voteService: VoteService) {}

  @Post()
  async createVote(@Res() res: Response, @Body() body: CreateVoteDTO) {
    try {
      const result = await this.voteService.createVote(body);

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
  async getVoteList(@Res() res: Response) {
    try {
      const result = await this.voteService.getVoteList();
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

  @Get('/:vote_id')
  async getVote(@Res() res: Response, @Param('vote_id') vote_id: string) {
    try {
      const result = await this.voteService.getVote(vote_id);
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
  async updateVote(@Res() res: Response, @Body() body: UpdateVoteDTO) {
    try {
      const result = await this.voteService.updateVote(body);
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

  @Delete('/:vote_id')
  async deleteVote(@Res() res: Response, @Param('vote_id') vote_id: string) {
    try {
      const result = await this.voteService.deleteVote(vote_id);
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
