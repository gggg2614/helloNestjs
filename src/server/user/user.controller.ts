import { Controller, Body, Delete, Post, Put, Param, Get } from '@nestjs/common';
import { CreateUserDTO, EditUserDTO } from './user.dto';
import { User } from './user.interface';
import { UserService } from './user.service';

interface UserResponse<T = unknown> {
    code: number,
    data?: T,
    message: string
}

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get('users')
    async findAll(): Promise<UserResponse<User[]>> {
        return {
            code: 200,
            data: await this.userService.findAll(),
            message: 'Success.'
        };
    }

    @Post()
    async addOne(@Body() body: CreateUserDTO): Promise<UserResponse> {
        await this.userService.addOne(body);
        return {
            code: 200,
            message: 'Success.'
        };
    }
}

