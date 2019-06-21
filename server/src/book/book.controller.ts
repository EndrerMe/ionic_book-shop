// Vendors
import { Controller, Get, Param, Post, Body } from '@nestjs/common';

// Interfaces
import { IBook } from './interfaces/IBook';
// Services
import { BookService } from './book.service';
// DTO
import { BookDTO } from './dto/book.dto';

@Controller('books')
export class BookController {
    constructor(
        private bookService: BookService,
    ) {

    }

    @Post('getBooks')
    public getAllBooks(@Body() skip: {skip: number}): Promise<IBook[]> {
        return this.bookService.getBooks(skip.skip);
    }

    @Get('getById/:id')
    public async getById(@Param('id') id: string): Promise<IBook> {
        return await this.bookService.findBookById(id);
    }

    @Post('addNewBook')
    public addNewBook(@Body() book: IBook): Promise<IBook> {
        return this.bookService.addNewBook(book);
    }

    @Post('deleteBook')
    public deleteBook(@Body() book: IBook): Promise<IBook> {
        return this.bookService.deleteBook(book);
    }

    @Post('changeBook')
    public changeBook(@Body() book: IBook): Promise<IBook> {
        return this.bookService.changeBook(book);
    }

    @Post('searchByTitle')
    public searchByTitle(@Body() title: BookDTO): Promise<IBook[]> {
        return this.bookService.findBookByName(title);
    }

    @Post('searchByAuthor')
    public searchByAuthor(@Body() author: BookDTO): Promise<IBook[]> {
        return this.bookService.findBookByAuthor(author);
    }

    @Post('searchByType')
    public searchByType(@Body() type: BookDTO): Promise<IBook[]> {
        return this.bookService.findBookByType(type);
    }

    @Post('searchByPrice')
    public searchByPrice(@Body() price: {lower: number, upper: number}): Promise<IBook[]> {
        return this.bookService.findBookByPrice(price);
    }

}
