import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
export class CreateIssueDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsString()
  stack?: string;

  @IsNotEmpty()
  @IsDateString()
  occurredAt: Date;

  @IsString()
  userAgent?: string;
}
