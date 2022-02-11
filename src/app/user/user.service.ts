import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly service: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user=this.service.create(createUserDto);
    this.service.merge(user,createUserDto)
    await this.service.save(user);
  }

  async findAll() {
    return await this.service.find({ select: ['id', 'name', 'email', 'createdAt'] });
  }

  async findOneOrfail(
    conditions?: FindConditions<UserEntity>,
    options?: FindOneOptions<UserEntity>,
  ) {
    try {
      return await this.service.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user=await this.findOneOrfail({id});
    this.service.merge(user,updateUserDto)
    await this.service.save(user);
  }

  async remove(id: string ){
    await this.findOneOrfail({id})
    return this.service.softDelete({id});
  }
}
