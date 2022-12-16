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
  Put,
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
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('Books')
//@UseGuards(Token())
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  getAll(@Token() token: string) {
    return this.bookService.getAllBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: string, @Token() token: string) {
    return this.bookService.getOne(id);
  }

  @Post('create')
  createBook(@Token() token: string, @Body() payload: CreateBookDto) {
    return this.bookService.createBook(payload);
  }

  @Put(':id/edit')
  updateBook(
    @Token() token: string,
    @Param('id') id: string,
    @Body() payload: UpdateBookDto,
  ) {
    return this.bookService.updateBook(id, payload);
  }
}
