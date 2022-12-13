import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schema/book.schema';
import { CreateBookDto } from './create-book.dto';
import { Cache, caching, CachingConfig } from 'cache-manager';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
    @Inject(CACHE_MANAGER) private cacheManager,
  ) {}

  async getAllBooks(token: string) {
    this.cacheManager = await caching('memory', { max: 100, ttl: 10 * 1000 });

    if (!token) {
      throw new UnauthorizedException();
    }

    const cachedBooks = await this.cacheManager.get('books');
    if (cachedBooks) {
      return { books: cachedBooks };
    }

    const books = await this.bookModel.find({ isActive: true });
    await this.cacheManager.set('books', books);

    return { books };
  }

  async getOne(token: string, id: string) {
    if (!token) {
      throw new UnauthorizedException();
    }

    if (!id) {
      throw new BadRequestException();
    }

    const book = await this.bookModel.findById({ _id: id });

    if (!book || !book.isActive) {
      throw new NotFoundException();
    }

    return book;
  }

  async createBook(token: string, payload: CreateBookDto) {
    if (!token) {
      throw new UnauthorizedException();
    }

    if (!payload) {
      throw new BadRequestException();
    }

    try {
      return await this.bookModel.create(payload);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
