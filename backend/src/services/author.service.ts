import * as _ from 'lodash';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Author } from 'src/entities/author.entity';
import { AuthorCreateDto } from 'src/types/author.type';
import { BookService } from 'src/services/book.service';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY')
    private readonly authorRepository: Repository<Author>,
    @Inject(forwardRef(() => BookService))
    private readonly bookService: BookService,
  ) {}

  async create(payload: AuthorCreateDto): Promise<Author> {
    const books = await this.bookService.getByIds(payload.books);

    const newAuthor = new Author();
    _.assign(newAuthor, payload, { books });

    return this.authorRepository.save(newAuthor);
  }

  getByIds(ids: number[]): Promise<Author[]> {
    return this.authorRepository.findBy({
      id: In(ids),
    });
  }

  getAll(): Promise<Author[]> {
    return this.authorRepository.find({
      relations: {
        books: true,
      },
    });
  }
}
