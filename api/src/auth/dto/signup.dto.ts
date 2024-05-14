import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'src/common/decorators';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @MinLength(6)
  @Match('password')
  passwordConfirm: string;
}
