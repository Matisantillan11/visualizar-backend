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
import { CreateBookDto } from './dto/create-book.dto';
import { caching } from 'cache-manager';
import { UpdateBookDto } from './dto/update-book.dto';
@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
    @Inject(CACHE_MANAGER) private cacheManager,
  ) {}

  async getAllBooks() {
    this.cacheManager = await caching('memory', { max: 100, ttl: 10 * 1000 });

    const cachedBooks = await this.cacheManager.get('books');
    if (cachedBooks) {
      return { books: cachedBooks };
    }

    const books = await this.bookModel.find({ isActive: true });
    await this.cacheManager.set('books', books);

    return { books };
  }

  async getOne(id: string) {
    if (!id) {
      throw new BadRequestException();
    }

    const book = await this.bookModel.findById({ _id: id });

    if (!book || !book.isActive) {
      throw new NotFoundException();
    }

    return book;
  }

  async createBook(payload: CreateBookDto) {
    if (!payload) {
      throw new BadRequestException();
    }

    try {
      return await this.bookModel.create(payload);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async updateBook(id: string, updateBook: UpdateBookDto) {
    if (!id || !updateBook) {
      throw new BadRequestException();
    }

    try {
      const book = await this.getOne(id);
      if (!book) {
        throw new NotFoundException();
      }

      const payload = {
        ...updateBook,
        updateDate: new Date(),
      };

      return await this.bookModel.findOneAndUpdate({ id: book.id }, payload);
    } catch (error) {
      console.log({ error });
      throw new InternalServerErrorException(error);
    }
  }
}
