import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from './Author';

@Entity({ name: 'author_books' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(type => Author, author => author.books)
  @JoinColumn({ name: 'author_id' })
  author: Author;
}