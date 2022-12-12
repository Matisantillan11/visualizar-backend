import {
  BadRequestException,
  Body,
  CacheInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { Token } from '../auth/decorators/get-token.decorator';
import { BookService } from './book.service';
import { CreateBookDto } from './create-book.dto';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAll(@Token() token: string) {
    return this.bookService.getAllBooks(token);
  }

  @Get(':id')
  getBookById(@Param('id') id: string, @Token() token: string) {
    return this.bookService.getOne(token, id);
  }

  @Post('create')
  createBook(@Token() token: string, @Body() payload: CreateBookDto) {
    return this.bookService.createBook(token, payload);
  }
}
