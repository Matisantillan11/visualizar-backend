import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: '' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
