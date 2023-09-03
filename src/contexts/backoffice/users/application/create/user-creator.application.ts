import { Injectable } from '@nestjs/common';
import User from '../../domain/entities/user.entity';
import UserRepository from '../../domain/repository/user.repository';

@Injectable()
export default class UserCreator {
  readonly #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  async create({
    id,
    name,
    mail,
    status,
  }: {
    id: string;
    name: string;
    mail: string;
    status: boolean;
  }): Promise<void> {
    const user = User.create(id, name, mail, status);

    return this.#userRepository.save(user);
  }
}
