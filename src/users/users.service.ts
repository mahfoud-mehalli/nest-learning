import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { NotFoundException } from '@nestjs/common';

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
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) {
                throw new NotFoundException(`User with role ${role} not found`);
                return rolesArray;
            }
        }
        return this.users;
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id);
        if (!user) throw new NotFoundException(`User with ID ${id} not found`);
        return user; 
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)[0];
        const newUser = {
            id: usersByHighestId.id + 1,
            ...createUserDto
        };
        this.users.push(newUser);
        return newUser;
    } 

    updateOne(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updateUserDto
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
