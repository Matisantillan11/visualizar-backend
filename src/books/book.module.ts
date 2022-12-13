import { CacheModule, CacheInterceptor, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './book.controller';
import { BookService } from './book.service';
import { Book, BookSchema } from './schema/book.schema';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  providers: [BookService],
  controllers: [BooksController],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
    CacheModule.registerAsync<any>({
      useFactory: () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 120,
      }),
    }),
  ],
})
export class BookModule {}
