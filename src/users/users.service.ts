import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Munzah Shah",
            "email": "munzah.shah00@gmail.com",
            "role": "ENGINEER"
        },
        {
            "id": 2,
            "name": "Shameel Uddin",
            "email": "shameelisuddin@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 3,
            "name": "Ammad Ahmad",
            "email": "ammadahmad@gmail.com",
            "role": "INTERN"
        },
        {
            "id": 4,
            "name": "Muzammil Channa",
            "email": "muzammilchanne@gmail.com",
            "role": "INTERN"
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if(role) {
            const rolesArray = this.users.filter(user => user.role === role)
            
            if(rolesArray.length === 0) throw new NotFoundException('User role not found...')
        
            return rolesArray
        }
        return this.users;
    }

    fineOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User not found...')
        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users.sort((a, b) => b.id - a.id)]
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user;
        })
        return this.fineOne(id)
    }

    delete(id: number) {
        const removedUser = this.fineOne(id);
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }

}
