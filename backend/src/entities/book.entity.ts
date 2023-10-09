import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Author } from './author.entity';

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  title: string;

  @Column('int')
  chapters: number;

  @Column('int')
  pages: number;

  @ManyToMany(() => Author, (author) => author.books, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  authors?: Author[];
}
