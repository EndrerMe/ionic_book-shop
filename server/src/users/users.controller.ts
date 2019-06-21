// Vendors
import { Controller, Get, Post, Body } from '@nestjs/common';

// Services
import { UsersService } from 'src/users/users.service';
// Interfaces
import { IUsers } from 'src/users/model/users.model';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) {}

    @Post('deleteUser')
    public async deleteUser(@Body() user: IUsers): Promise<IUsers[]> {
        return this.usersService.deleteUser(user);
    }

    @Post('changeUser')
    public async changeUser(@Body() user: IUsers): Promise<IUsers> {
        return this.usersService.changeUser(user);
    }

    @Post('getUsers')
    public async getUsers(@Body() skip: {skip: number}): Promise<IUsers[]> {
        return this.usersService.getUsers(skip.skip);
    }

    @Post('chagneUserAvatar')
    public async chagneUserAvatar(@Body() user: IUsers): Promise<IUsers> {
        return this.usersService.chagneUserAvatar(user);
    }
}
