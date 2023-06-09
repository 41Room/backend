import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferDTO {
  @IsNotEmpty()
  @IsString()
  to: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
