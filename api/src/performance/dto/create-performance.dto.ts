import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePerformanceDto {
  @IsNotEmpty()
  @IsNumber()
  responseTime: number;

  @IsNotEmpty()
  @IsNumber()
  loadTime: number;
}
