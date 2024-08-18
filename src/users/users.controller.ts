import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users') // /users
export class UsersController {

    // GET /users or /users?role=value
    @Get()
    findAll(@Query('role') role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
        return[] 
    }

    // GET /users/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id }
    }

    // POST /users
    @Post()
    create(@Body() user: {}) {
        return user
    }

    // PATCH /users/:id
    @Patch(':id')
    updateOne(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate }
    }

    // DELETE /users/:id
    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return { id }
    }
}