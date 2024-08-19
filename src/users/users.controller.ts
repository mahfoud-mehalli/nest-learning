import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

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
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id);
    }

    // POST /users
    @Post()
    create(@Body() user: { name: string, email: string, role: 'ADMIN' | 'ENGINEER' | 'INTERN' }) {
        return this.usersService.create(user);
    }

    // PATCH /users/:id
    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() userUpdate: { name?: string, email?: string, role?: 'ADMIN' | 'ENGINEER' | 'INTERN' }) {
        return this.usersService.updateOne(+id, userUpdate);
    }

    // DELETE /users/:id
    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.usersService.deleteOne(+id);
    }
}