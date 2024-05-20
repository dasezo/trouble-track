import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LogInDto, SignUpDto } from './dto';
import { Tokens } from './types';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signup(signUpDto: SignUpDto): Promise<Tokens> {
    const { name, email } = signUpDto;
    const password = await this.hashData(signUpDto.password);

    const user = await this.userService.create({
      name,
      email,
      password,
    });

    const tokens = {
      accessToken: this.getAccessToken(user.id, user.email, user.name),
      refreshToken: this.getRefreshToken(user.id, user.email),
    };
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async login(loginDto: LogInDto) {
    const { email, password } = loginDto;

    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = {
      accessToken: this.getAccessToken(user.id, user.email, user.name),
      refreshToken: this.getRefreshToken(user.id, user.email),
    };
    tokens;
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(userId) {
    await this.userService.update(userId, {
      refreshToken: null,
    });
    return true;
  }

  async refreshAccessToken(userId: string, rt: string): Promise<string> {
    const user = await this.userService.findOne(userId);

    if (!user) throw new ForbiddenException('Access Denied! User not found');
    if (!user.refreshToken)
      throw new ForbiddenException('Access Denied! Refresh token not found');

    const rtMatches = await bcrypt.compare(rt, user.refreshToken);
    if (!rtMatches)
      throw new ForbiddenException('Access Denied! Invalid refresh token');

    return await this.getAccessToken(userId, user.email, user.name);
  }

  /**
   ** Helper Funcions
   */

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  getAccessToken(userId: string, email: string, name: string): string {
    const accessToken = this.jwtService.sign(
      { sub: userId, email, name },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
      },
    );

    return accessToken;
  }

  getRefreshToken(userId: string, email: string): string {
    const refreshToken = this.jwtService.sign(
      { sub: userId, email },
      {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      },
    );
    return refreshToken;
  }
  /**
   * * Updates refresh token in database
   * @param userId
   * @param rt : refresh token
   */
  async updateRefreshToken(userId, rt: string) {
    const hashedRt = await this.hashData(rt);
    return await this.userService.update(userId, {
      refreshToken: hashedRt,
    });
  }
}
