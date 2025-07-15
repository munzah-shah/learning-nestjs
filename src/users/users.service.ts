import { Injectable } from '@nestjs/common';

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
            return this.users.filter(user => user.role === role)
        }
        return this.users;
    }

    fineOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user;
    }

    create(user: { name: string, email: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        const usersByHighestId = [...this.users.sort((a, b) => b.id - a.id)]
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...user
        }
        this.users.push(newUser)
        return newUser;
    }

    update(id: number, updatedUser: { name?: string, email?: string, role?: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
        this.users = this.users.map(user => {
            if(user.id === id) {
                return {...user, ...updatedUser}
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
