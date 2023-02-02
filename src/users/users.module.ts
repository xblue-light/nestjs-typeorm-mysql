import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Role';
import { UserRole } from 'src/typeorm/entities/UserRole';
import { Post } from '../typeorm/entities/Post';
import { Profile } from '../typeorm/entities/Profile';
import { User } from '../typeorm/entities/User';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post, Role, UserRole])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
