import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsService } from './services/authors/authors.service';
import { AuthorsController } from './controllers/authors/authors.controller';
import { Author } from 'src/typeorm/entities/Author';
import { Book } from 'src/typeorm/entities/Book';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
