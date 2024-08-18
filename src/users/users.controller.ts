import { Controller, Get, Param, Post } from '@nestjs/common';

@Controller('users') // /users
export class UsersController {

    // GET /users
    @Get()
    findAll() {
        return[] 
    }

    // GET /users/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return { id }
    }

    // GET /users/interns
    @Get('interns')
    findAllInterns() {
        return []
    }

    // POST /users

    // PATCH /users/:id
    // DELETE /users/:id
}
