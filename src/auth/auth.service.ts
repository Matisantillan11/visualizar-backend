import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthenticateUserDto } from './dto/authenticate-user.dto';
import { IJWTPayload } from './interface/jwt.interface';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
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

  async login(authenticateUserDto: AuthenticateUserDto) {
    try {
      const { password, email } = authenticateUserDto;
      const user = await this.userModel.findOne({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid credentials.');
      }

      const isPasswordEqual = bcrypt.compareSync(password, user.secret);
      if (!isPasswordEqual) {
        throw new UnauthorizedException('Invalid credentials.');
      }

      delete user.secret;
      return {
        user,
        token: this.generateJWT({ id: user._id, email: user.email }),
      };
    } catch (error) {
      return error.response;
    }
  }

  async mailerPasswordRecovery(userEmail: string) {
    try {
      if (userEmail !== undefined && userEmail !== null && userEmail !== '') {
        const user: User = await this.userModel.findOne({ email: userEmail });
        if (user) {
          if (user.isActive) {
            const mailResponse = await this.mailService.sendMail({
              to: user?.email,
              from: process.env.MAIL_ADDRESS_CONFIG,
              subject: `No Reply <${process.env.MAIL_ADDRESS_CONFIG}>`,
              text: `Hello ${user.name} ${user.lastname}, we are here to help you to recover your account`,
            });

            if (mailResponse?.rejected?.length > 0) {
              throw new InternalServerErrorException(
                'Cannot send you recovery email',
              );
            }

            return {
              message: `We send you an recovery email to ${user.email} with stricted instructios to reset your password.`,
            };
          }
          throw new NotFoundException(`User with email ${userEmail} not found`);
        }

        throw new NotFoundException(`User with email ${userEmail} not found`);
      } else {
        throw new BadRequestException('User email not provided');
      }
    } catch (error) {
      return error.response;
    }
  }

  async validateJWT(token: string) {
    const { id, email } = this.jwtService.verify(token);
    if (!id || !email) {
      throw new UnauthorizedException('Invalid Token.');
    }

    const user = await this.userModel.findOne({ id, email });
    if (!user.isActive) {
      throw new UnauthorizedException('User account inactive.');
    }

    delete user.secret;
    delete user.__v;
    return { user, token: this.generateJWT({ id, email }) };
  }

  private generateJWT(payload: IJWTPayload) {
    return this.jwtService.sign(payload);
  }
}
