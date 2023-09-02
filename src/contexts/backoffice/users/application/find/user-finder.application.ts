import UserId from 'src/contexts/shared/domain/value-object/user-id.value-object';
import User from '../../domain/entities/user.entity';
import UserRepository from '../../domain/repository/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserFinder {
  readonly #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  async find(id: string): Promise<User> {
    const userId = new UserId(id);
    return this.#userRepository.find(userId);
  }

  async findAll(): Promise<User[]> {
    return this.#userRepository.findAll();
  }
}
