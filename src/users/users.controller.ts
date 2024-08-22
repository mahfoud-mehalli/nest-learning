import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('users') // /users
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // GET /users or /users?role=value
    @Get()
    findAll(@Query('role') role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
        return this.usersService.findAll(role); 
    }

    // GET /users/:id
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    // POST /users
    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    // PATCH /users/:id
    @Patch(':id')
    updateOne(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
        return this.usersService.updateOne(id, updateUserDto);
    }

    // DELETE /users/:id
    @Delete(':id')
    deleteOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteOne(id);
    }
}