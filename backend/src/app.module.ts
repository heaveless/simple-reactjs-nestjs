import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from './entities/author.entity';
import { DefaultController } from './controllers/default.controller';
import { AuthorController } from './controllers/author.controller';
import { BookController } from './controllers/book.controller';
import { AuthorService } from './services/author.service';
import { BookService } from './services/book.service';

@Module({
  imports: [],
  controllers: [DefaultController, AuthorController, BookController],
  providers: [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
          type: 'sqlite',
          database: 'alicunde',
          entities: [Author, Book],
          synchronize: true,
        });

        return dataSource.initialize();
      },
    },
    {
      provide: 'BOOK_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
      inject: ['DATA_SOURCE'],
    },
    {
      provide: 'AUTHOR_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
      inject: ['DATA_SOURCE'],
    },
    AuthorService,
    BookService,
  ],
})
export class AppModule {}
