import * as _ from 'lodash';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Book } from 'src/entities/book.entity';
import {
  BookCreateDto,
  PagesPerChapterQuery,
  PagesPerChapterReturn,
} from 'src/types/book.type';
import { AuthorService } from './author.service';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY')
    private bookRepository: Repository<Book>,
    @Inject(forwardRef(() => AuthorService))
    private readonly authorService: AuthorService,
  ) {}

  async create(payload: BookCreateDto): Promise<Book> {
    const authors = await this.authorService.getByIds(payload.authors);

    const newBook = new Book();
    _.assign(newBook, payload, { authors });

    return this.bookRepository.save(newBook);
  }

  getByIds(ids: number[]): Promise<Book[]> {
    return this.bookRepository.findBy({
      id: In(ids),
    });
  }

  getAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: {
        authors: true,
      },
    });
  }

  async getPagesPerChapter(
    id: PagesPerChapterQuery,
  ): Promise<PagesPerChapterReturn> {
    const book = await this.bookRepository.findOneBy({ id });

    return {
      id: id.toString(),
      pagesPerChapter: (book.pages / book.chapters).toFixed(2),
    };
  }
}
