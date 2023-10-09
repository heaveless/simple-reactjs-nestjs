import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BookService } from 'src/services/book.service';
import { BookCreateDto, PagesPerChapterQuery } from 'src/types/book.type';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/create')
  create(@Body() payload: BookCreateDto) {
    return this.bookService.create(payload);
  }

  @Get()
  getAll(): Promise<unknown[]> {
    return this.bookService.getAll();
  }

  @Get('/pages-per-chapter/:id')
  getPagesPerChapter(@Param('id') id: PagesPerChapterQuery): Promise<unknown> {
    return this.bookService.getPagesPerChapter(id);
  }
}
