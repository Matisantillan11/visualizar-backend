import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

export const Token = createParamDecorator((data, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (!request.rawHeaders) {
    throw new InternalServerErrorException('Headers not found');
  }

  for (const header of request.rawHeaders) {
    if (header.includes('Bearer')) return header.substring(7);
  }

  throw new UnauthorizedException('Token not found.');
});
