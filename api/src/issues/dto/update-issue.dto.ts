import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateIssueDto } from './create-issue.dto';

export class UpdateIssueDto extends PartialType(CreateIssueDto) {
  @IsOptional()
  @IsString()
  @IsEnum(['open', 'closed', 'archived'], { message: 'Invalid status' })
  status?: string;

  @IsOptional()
  @IsString()
  @IsEnum(['Critical', 'Major', 'Minor'], { message: 'Invalid severity' })
  severity?: string;
}
