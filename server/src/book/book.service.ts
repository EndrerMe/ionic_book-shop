// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Interfaces
import { IBook } from 'src/book/interfaces/IBook';
// DTO
import { BookDTO } from 'src/book/dto/book.dto';

@Injectable()
export class BookService {
    constructor(
        @InjectModel('Books') private readonly bookModel: Model<IBook>,
    ) {
    }

    public async findBookById(id: string): Promise<IBook> {
        return await this.bookModel.findOne({_id: id});
    }

    public async findBookByName(title: BookDTO): Promise<IBook[]> {
        const bookByName = this.bookModel.find({name: {$regex: `.*${title.title}.*`}});
        return await bookByName;
    }

    public async findBookByAuthor(author: BookDTO): Promise<IBook[]> {
        const bookByAuthor = this.bookModel.find({authors: {$elemMatch: {name: {$regex: `.*${author.author}.*`}}}});
        return await bookByAuthor;
    }

    public async findBookByType(type: BookDTO): Promise<IBook[]> {
        const bookByType = this.bookModel.find({type: {$regex: `.*${type.type}.*`}});
        return await bookByType;
    }

    public async findBookByPrice(price: {lower: number, upper: number}): Promise<IBook[]> {
        const bookByPrice = this.bookModel.find({$and : [{price: {$gt : price.lower}}, {price: {$lt : price.upper}}]});
        return await bookByPrice;
    }

    public async getBooks(skip: number): Promise<IBook[]> {

        return await this.bookModel.find().skip(skip).limit(5);
    }

    public async addNewBook(book: any): Promise<IBook> {
        const isBook = await this.findBookByName(book.newBookTitle);
        if (isBook.length !== 0) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Book is already exists',
            }, 403);
        }

        if (isBook.length === 0) {
            const createdBook: IBook = {
                name: book.newBookTitle,
                authors: book.newBookAuthor,
                description: book.newBookInfo,
                type: book.newBookType,
                price: book.newBookPrice,
            };

            const newBook = new this.bookModel(createdBook);
            return newBook.save();
        }
    }

    public async deleteBook(book): Promise<IBook> {
        const isBook = this.findBookById(book.id);

        if (!isBook) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Book not found',
            }, 404);
        }

        if (isBook) {
            return this.bookModel.remove({_id: book.id});
        }
    }

    public async changeBook(book): Promise<IBook> {
        const isBook = this.findBookById(book.id);

        if (!isBook) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Password is worng',
            }, 404);
        }

        if (isBook) {
            return this.bookModel.updateOne({_id: book.id}, book);
        }
    }
}
