// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// Interfaces
import { IUsers } from './model/users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('Users') private readonly usersModel: Model<IUsers>,
    ) {}

    public async deleteUser(user: IUsers): Promise<IUsers[]> {
        return this.usersModel.remove({_id: user.id});
    }

    public async changeUser(user: IUsers): Promise<IUsers> {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(user.userPassword, salt);
        user.userPassword = hash;
        return this.usersModel.updateOne({_id: user.id}, user);
    }

    public async getUsers(skip: number): Promise<IUsers[]> {
        return await this.usersModel.find().skip(skip).limit(5);
    }

    public async chagneUserAvatar(user: IUsers): Promise <IUsers> {
        const isUser = await this.usersModel.findOne({_id: user.id});

        if (isUser === null) {
            throw new HttpException({
                status: HttpStatus. NOT_FOUND,
                error: 'User not found',
            }, 404);
        } else {
            return this.usersModel.updateOne({_id: user.id}, user);
        }

    }
}
