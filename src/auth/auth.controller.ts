import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './schema/user.schema';
import { Token } from './decorators/get-token.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
    return this.authService.createUser(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User validated successfully',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: '' })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Something went wrong',
  })
  @ApiBody({ type: CreateUserDto })
  login(@Body() authenticateUserDto: AuthenticateUserDto) {
    return this.authService.login(authenticateUserDto);
  }

  @Post('validate-token')
  @UseGuards(AuthGuard())
  verifyToken(@Token() token: string) {
    return this.authService.validateJWT(token);
  }
}
