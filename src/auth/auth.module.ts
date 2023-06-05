import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TenantModule } from 'src/tenant/tenant.module';
import { AgentModule } from 'src/agent/agent.module';

@Module({
  imports: [TenantModule, AgentModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
