import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { User, UserDocument } from '../common/schemas/User.schema';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    // Check if user already exists
    const userExists = await this.findByEmail(createUserDto.email);
    if (userExists) throw new ConflictException('User already exists');

    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserDocument> {
    if (!isValidObjectId(id)) throw new BadRequestException('Invalid id');
    return await this.userModel.findById(id);
  }
  async findByEmail(email: string): Promise<UserDocument> {
    return await this.userModel.findOne({ email }).exec();
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<UserDocument> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
