import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Author } from 'src/entities/author.entity';

export class AuthorCreateDto implements Omit<Author, 'id' | 'books'> {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  books?: number[];
}
