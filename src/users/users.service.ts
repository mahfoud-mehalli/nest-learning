import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'ADMIN'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'ENGINEER'
        },
        {
            id: 3,
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            role: 'INTERN'
        },
        {
            id: 4,
            name: 'Bob Williams',
            email: 'bob.williams@example.com',
            role: 'ENGINEER'
        },
        {
            id: 5,
            name: 'Sarah Davis',
            email: 'sarah.davis@example.com',
            role: 'INTERN'
        }
    ];

    findAll(role?: 'ADMIN' | 'ENGINEER' | 'INTERN') {
        if (role){
            return this.users.filter(user => user.role === role)
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        return user; 
    }

    create(user: { name: string, email: string, role: 'ADMIN' | 'ENGINEER' | 'INTERN' }) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
        const newUser = {
            id: usersByHighestId.id + 1,
            ...user
        };
        this.users.push(newUser);
        return newUser;
    } 

    updateOne(id: number, updatedUser:  { name?: string, email?: string, role?: 'ADMIN' | 'ENGINEER' | 'INTERN' }) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updatedUser
                }
            }
            return this.findOne(id);
        });

        return this.users.find(user => user.id === id);
    }

    deleteOne(id: number) {
        const removedUser = this.findOne(id);
        this.users = this.users.filter(user => user.id !== id);
        return removedUser;
    }
}
