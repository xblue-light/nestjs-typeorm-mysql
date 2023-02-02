import { Controller, Get, Post, Body, ParseIntPipe, Param, Delete, ParseFloatPipe, Put } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dtos/CreateAuthor.dto';
import { CreateAuthorBooksDto } from 'src/authors/dtos/CreateAuthorBooks.dto';
import { UpdateAuthorDto } from 'src/authors/dtos/UpdateAuthor.dto';
import { AuthorsService } from 'src/authors/services/authors/authors.service';

@Controller('authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @Get()
    async getAuthors() {
        return this.authorsService.findAuthors();
    }

    @Put(':id')
    updateAuthorById(@Param('id', ParseIntPipe) id: number, @Body() updateAuthorDto: UpdateAuthorDto) {
        return this.authorsService.updateAuthor(id, updateAuthorDto);
    }
    
    @Delete(':id')
    deleteAuthor(@Param('id', ParseIntPipe) id: number) {
        return this.authorsService.deleteAuthorBooksAndAuthor(id);
    }
    
    @Post()
    createAuthor(@Body() createAuthorDto: CreateAuthorDto) {
      return this.authorsService.createAuthor(createAuthorDto);
    }

    @Post(':id/books')
    createAuthorBooks(@Param('id', ParseIntPipe) id: number, @Body() createAuthorBooksDto: CreateAuthorBooksDto) {
        return this.authorsService.createAuthorBooks(id, createAuthorBooksDto);
    }

    @Delete(':id/books')
    deleteAuthorBookById(@Param('id', ParseIntPipe) id: number) {
        return this.authorsService.deleteAuthorBookById(id);
    }

}
