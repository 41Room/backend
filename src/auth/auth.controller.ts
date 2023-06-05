import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateAgentDTO } from 'src/agent/dto';
import { AuthService } from './auth.service';
import { AgentSigninDTO, TenantSigninDTO } from './dto';
import { CreateTenantDTO } from 'src/tenant/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/agent/signup')
  async signupAgent(@Res() res: Response, @Body() body: CreateAgentDTO) {
    try {
      const result = await this.authService.signupAgent(body);
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

  @Post('/agent/signin')
  async signinAgent(@Res() res: Response, @Body() body: AgentSigninDTO) {
    try {
      const result = await this.authService.singinAgent(body);
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

  @Post('/tenant/signup')
  async signupTenant(@Res() res: Response, @Body() body: CreateTenantDTO) {
    try {
      const result = await this.authService.signupTenant(body);
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

  @Post('/tenant/signin')
  async signinTenant(@Res() res: Response, @Body() body: TenantSigninDTO) {
    try {
      const result = await this.authService.signinTenant(body);
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
