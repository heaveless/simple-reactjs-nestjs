import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Book } from 'src/entities/book.entity';

export class BookCreateDto implements Omit<Book, 'id' | 'authors'> {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  chapters: number;

  @IsNotEmpty()
  @IsNumber()
  pages: number;

  @IsOptional()
  @IsArray()
  authors?: number[];
}

export type PagesPerChapterQuery = number;

export type PagesPerChapterReturn = {
  id: string;
  pagesPerChapter: string;
};
