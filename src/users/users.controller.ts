import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users') // /users route
export class UsersController {
    /* we'll have the following routes in our users API
        GET: /users or /users?role=value (Query Paramaters)
        GET: /users/:id
        POST: /users
        PATCH: /users/:id
        DELETE /users/:id
    */

    @Get() // GET /users or /users?role=value
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return []
    }

    @Get(':id') // GET /users/:id
    findOne(@Param('id') id: string ) { 
        return { id }
    }

    @Post() //POST /users
    create(@Body() user: {}) {
        return user
    }

    @Patch(':id') // PATCH /users/:id
    update(@Param('id') id: string, @Body() updatedUser: {} ) { 
        return { id, ...updatedUser }
    }

    @Delete(':id') // DELETE /users/:id
    delete(@Param('id') id: string) {
        return { id }
    }
}
