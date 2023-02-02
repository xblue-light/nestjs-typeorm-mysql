import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/typeorm/entities/Role';
import { UserRole } from 'src/typeorm/entities/UserRole';
import { Repository } from 'typeorm';
import { Post } from '../../../typeorm/entities/Post';
import { Profile } from '../../../typeorm/entities/Profile';
import { User } from '../../../typeorm/entities/User';
import {
  CreateUserParams,
  CreateUserPostParams,
  CreateUserProfileParams,
  RoleDetailsParams,
  UpdateUserParams,
} from '../../../utils/types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(UserRole) private readonly userRoleRepository: Repository<UserRole>
  ) {}

  findUsers() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserProfile(
    id: number,
    createUserProfileDetails: CreateUserProfileParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newProfile = this.profileRepository.create(createUserProfileDetails);
    const savedProfile = await this.profileRepository.save(newProfile);

    console.log(JSON.stringify(user));
    debugger;
    user.profile = savedProfile;
    return this.userRepository.save(user);
  }

  async createUserPost(
    id: number,
    createUserPostDetails: CreateUserPostParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newUserPost = this.postRepository.create({
      ...createUserPostDetails,
      user,
    });
    return this.postRepository.save(newUserPost);
  }


  // Add a role to a user, if user exists and role should exist.
  async addRoleToUser(userId: number, roleId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    console.log(JSON.stringify(user));

    if (!user) {
      throw new HttpException(
        'User not found. Cannot add role.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const role = await this.roleRepository.findOneBy({ id: roleId });
    console.log(JSON.stringify(role));
    // TODO: check for role?

    const userRole = new UserRole();

    userRole.user = user;
    userRole.role = role;

    console.log(JSON.stringify(userRole))
    return this.userRoleRepository.save(userRole);

  }

  // TODO: Extract to role service
  async addRole(roleDetails: RoleDetailsParams) {
    return this.roleRepository.save(roleDetails);
  }



}
