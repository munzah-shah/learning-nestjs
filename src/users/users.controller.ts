import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users') // /users route
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    /* we'll have the following routes in our users API
        GET: /users or /users?role=value (Query Paramaters)
        GET: /users/:id
        POST: /users
        PATCH: /users/:id
        DELETE /users/:id
    */

    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role)
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string ) { 
        return this.usersService.fineOne(+id)
    }

    @Post() //POST /users
    create(@Body() user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        return this.usersService.create(user)
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' } ) { 
        return this.usersService.update(+id, updatedUser)
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return this.usersService.delete(+id)
    }
}
