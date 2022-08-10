import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  createUser(createUser: CreateUserDto): CreateUserDto {
    return createUser;
  }
}
