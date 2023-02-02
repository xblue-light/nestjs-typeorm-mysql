import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/typeorm/entities/Author';
import { Book } from 'src/typeorm/entities/Book';
import { AuthorDetails, CreateAuthorBooks, UpdateAuthorDetails } from 'src/utils/types';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {

    constructor(
        @InjectRepository(Author) private authorRepository: Repository<Author>, 
        @InjectRepository(Book) private booksRepository: Repository<Book>
    ) {}

    // Find all authors and their owned books.
    findAuthors() {
        return this.authorRepository.find({ relations: ['books'] })
    }

    // Create new author
    createAuthor(authorDetails: AuthorDetails) {
        const newAuthor = this.authorRepository.create({
            ...authorDetails
        });
        return this.authorRepository.save(newAuthor)
    }

    // Update author by ID
    async updateAuthor(id: number, updateAuthorDetails: UpdateAuthorDetails) {
        return await this.authorRepository.update({id}, {...updateAuthorDetails});
    }

    // Delete authors books and then the author.
    async deleteAuthorBooksAndAuthor(id: number) {

        await this.booksRepository.createQueryBuilder("author_books").delete()
        .from(Book)
        .where("author_id = :id", { id })
        .execute()

        return this.authorRepository.delete({ id });
    }

    // Delete author books, but not the author itself.
    deleteAuthorBookById(id: number) {
        return this.booksRepository.delete({id});
    }

    // Create new author book/s if author exists.
    async createAuthorBooks(
        id: number,
        createAuthorBookDetails: CreateAuthorBooks,
      ) {

        const author = await this.authorRepository.findOneBy({ id });

        if (!author) {
            throw new HttpException(
                'Error: Author does not exist. Please create author first!',
                HttpStatus.BAD_REQUEST,
              );
        }
        
        const authorBook = this.booksRepository.create({
          ...createAuthorBookDetails,
          author
        });

        return this.booksRepository.save(authorBook);
      }
}
