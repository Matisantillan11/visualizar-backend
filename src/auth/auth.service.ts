import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { secret, ...userData } = createUserDto;
      const secretHash = bcrypt.hashSync(secret, 10);
      const user = await this.userModel.create({
        ...userData,
        secret: secretHash,
      });

      delete user.secret;

      return user;
    } catch (error) {
      console.log({ error });
    }
  }
}
