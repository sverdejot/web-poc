import UserId from 'src/contexts/shared/domain/value-object/user-id.value-object';
import UserRepository from '../../domain/repository/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class PersonalInfoUpdater {
  readonly #userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.#userRepository = userRepository;
  }

  async update({
    id,
    newName,
    newMail,
  }: {
    id: string;
    newName?: string;
    newMail?: string;
  }): Promise<void> {
    const userId = new UserId(id);
    const user = await this.#userRepository.find(userId);

    user.updatePersonalInfo(newName, newMail);

    return this.#userRepository.save(user);
  }
}
