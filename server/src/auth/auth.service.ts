// Vendors
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// Interfaces
import { IAuth } from './Interfaces/IAuth';
// Strategy
import { JwtPayload } from './../strategy/interfaces/jwt.model';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel("Users") private readonly authModel: Model<IAuth>,
        private readonly jwtService: JwtService
    ) {}

    public async create(user: IAuth): Promise<IAuth> {
        const saltRounds = 10
        let createdUser = new this.authModel(user)
        createdUser.userAvatar = "https://image.flaticon.com/icons/svg/17/17004.svg"
        bcrypt.hash(createdUser.userPassword, saltRounds, async function (err, hash) {
            createdUser.userPassword = hash
            return await createdUser.save()
        });     
        return createdUser;
    }

    public async findUserForRegist(username: string): Promise<boolean> {
        const user = await this.authModel.findOne({userName: username});
        console.log(user)

        if (user === null) {
            return true
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: "This username is allready in use"
            }, 403);
        }
    }

    public async findUserByName(username: string): Promise<IAuth> {        
        const user = await this.authModel.findOne({userName: username});
        if (user === null) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                error: "User not found"
            }, 404);
        } else {
            return user;
        }
        
    }

    public async singIn(userName: string): Promise<string> {
        const neededUser = await this.findUserByName(userName)
        const user: JwtPayload = {
            id: neededUser.id,
            userName: neededUser.userName,
            userEmail: neededUser.userEmail,
            userGender: neededUser.userGender,
            userAvatar: neededUser.userAvatar,
            userRole: neededUser.userRole
        };
        return this.jwtService.sign(user)
    }

    // public validateUser(payload: any): Promise<any> {
    //     return this.findOneByEmail(payload.email)
    // }
}
