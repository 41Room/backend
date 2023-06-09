import { Module } from '@nestjs/common';
import { Web3Controller } from './web3.controller';
import { Web3Service } from './web3.service';
import Web3 from 'web3';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [Web3Controller],
  providers: [
    {
      provide: 'Web3',
      useFactory: async (configService: ConfigService) => {
        const INFURA_API_KEY = configService.get('INFURA_API_KEY');
        return new Web3(`https://sepolia.infura.io/v3/${INFURA_API_KEY}`);
      },
      inject: [ConfigService],
    },
    Web3Service,
  ],
})
export class Web3Module {}
