import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { AuthService } from './auth.service';
import { LogInDto, SignUpDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.signup(signUpDto);
    res.cookie('jwt_refresh', refreshToken, {
      httpOnly: true, //accessible only by web server
      // secure: true, //https
    });
    delete signUpDto.password;
    delete signUpDto.confirmPassword;
    return { user: signUpDto, accessToken };
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LogInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginDto);

    res.cookie('jwt_refresh', refreshToken, {
      httpOnly: true, //accessible only by web server
      // secure: true, //https
    });

    return { accessToken };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response,
    @GetCurrentUserId() userId: string,
  ) {
    res.clearCookie('jwt_refresh');
    return {
      loggedOut: await this.authService.logout(userId),
    };
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Req() req: Request, @GetCurrentUserId() userId: string) {
    const refreshToken = req.cookies.jwt_refresh;
    const accessToken = await this.authService.refreshAccessToken(
      userId,
      refreshToken,
    );
    return { accessToken };
  }
}
