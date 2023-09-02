import UserId from 'src/contexts/shared/domain/value-object/user-id.value-object';
import UserRepository from '../../domain/repository/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserDeleter {
  readonly #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  async delete({ id }: { id: string }): Promise<void> {
    const userId = new UserId(id);

    return this.#userRepository.delete(userId);
  }
}
