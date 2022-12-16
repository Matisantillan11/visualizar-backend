import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export const handleExceptions = (statusCode: number) => {
  switch (statusCode) {
    case 400:
      throw new BadRequestException();

    case 404:
      throw new NotFoundException();

    case 403:
      throw new ForbiddenException();
    default:
      throw new InternalServerErrorException();
  }
};
