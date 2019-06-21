// Vendors
import { Controller, Body, Post, Get } from '@nestjs/common';

// Services
import { AuthorsService } from 'src/authors/authors.service';
// Interfaces
import { IAuthor } from 'src/authors/Interfaces/IBook';

@Controller('authors')
export class AuthorsController {
    constructor(
        private authorsService: AuthorsService,
    ) {}

    @Post('addNewAuthor')
    public async addNewAuthor(@Body() author: IAuthor): Promise<IAuthor> {
        return this.authorsService.addNewAuthor(author);
    }

    @Get('getAllAuthors')
    public async getAllAuthors(): Promise<IAuthor[]> {
        return this.authorsService.getAllAuthors();
    }

    @Post('getAuthors')
    public async getAuthors(@Body() skip: {skip: number}): Promise<IAuthor[]> {
        return this.authorsService.getAuthors(skip.skip);
    }

    @Post('changeAuthorName')
    public async changeAuthorName(@Body() author: IAuthor): Promise<IAuthor> {
        return this.authorsService.changeAuthorName(author);
    }

    @Post('deleteAuthor')
    public async deleteAuthor(@Body() author: IAuthor): Promise<IAuthor> {
        return this.authorsService.deleteAuthor(author);
    }
}
