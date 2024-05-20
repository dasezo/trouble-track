import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   ** This method is commented out because it is not needed for the current implementation.
   */
  /*
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  } */

  // @Public()
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  @Get('me')
  async me(@GetCurrentUserId() userId) {
    return await this.usersService.getUserData(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(id);
  }

  @Get(':email')
  async findByEmail(@Query('email') email: string) {
    return await this.usersService.findByEmail(email);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
