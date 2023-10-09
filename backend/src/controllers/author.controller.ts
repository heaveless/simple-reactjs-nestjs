import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorService } from 'src/services/author.service';
import { AuthorCreateDto } from 'src/types/author.type';

@Controller('/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() payload: AuthorCreateDto) {
    return this.authorService.create(payload);
  }

  @Get()
  getAll(): Promise<unknown[]> {
    return this.authorService.getAll();
  }
}
