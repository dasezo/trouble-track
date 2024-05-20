import { IsNotEmpty, IsString, IsUrl } from 'class-validator';
export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
