// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

// Interfaces
import { IAuthor } from './Interfaces/IBook';

@Injectable()
export class AuthorsService {
    constructor(
        @InjectModel('Authors') private authorModel: Model<IAuthor>,
    ) {

    }

    public getAllAuthors(): Promise<IAuthor[]> {
        return this.authorModel.find().exec();
    }

    public async findAuthorByName(authorName: string): Promise<IAuthor[]> {
        const author = this.authorModel.find({name: authorName});
        return await author;
    }

    public async findAuthorById(authorId: number): Promise<IAuthor> {
        const author = this.authorModel.findOne({_id: authorId});
        return await author;
    }

    public async addNewAuthor(author): Promise<IAuthor> {
        const isAuthor = await this.findAuthorByName(author.name);
        if (isAuthor.length !== 0) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Author is already exists',
            }, 404);
        }
        if (isAuthor.length === 0) {
            const createdAuthor = new this.authorModel(author);
            return createdAuthor.save();
        }
    }

    public async getAuthors(skip: number): Promise<IAuthor[]> {
        return this.authorModel.find().skip(skip).limit(5);
    }

    public async changeAuthorName(author: IAuthor): Promise<IAuthor> {
        const isAuthor = this.findAuthorById(author.id);

        if (!isAuthor) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Author not found',
            }, 404);
        }

        if (isAuthor) {
            return this.authorModel.updateOne({_id: author.id}, author);
        }
    }

    public async deleteAuthor(author: IAuthor): Promise<IAuthor> {
        const isAuthor = this.findAuthorById(author.id);

        if (!isAuthor) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: 'Password is worng',
            }, 404);
        }

        if (isAuthor) {
            return this.authorModel.remove({ _id: author.id });
        }
    }
}
