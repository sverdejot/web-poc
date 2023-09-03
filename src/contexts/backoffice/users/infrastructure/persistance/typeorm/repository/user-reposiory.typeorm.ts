import User from 'src/contexts/backoffice/users/domain/entities/user.entity';
import UserRepository from 'src/contexts/backoffice/users/domain/repository/user.repository';
import UserId from 'src/contexts/shared/domain/value-object/user-id.value-object';
import TypeORMRepository from 'src/contexts/shared/infrastructure/persistance/typeorm/repository';
import { DataSource, EntitySchema } from 'typeorm';
import { UserSchema } from '../schema/user.schema';
import UserNotFoundError from 'src/contexts/backoffice/users/domain/errors/user-not-found.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class TypeORMUserRepositoryƒcontrol
  extends TypeORMRepository<User>
  implements UserRepository
{
  constructor(ds: DataSource) {
    super(ds);
  }
  protected getSchema(): EntitySchema<User> {
    return UserSchema;
  }

  async save(user: User): Promise<void> {
    await this.repository.upsert(user, ['id']);
  }

  async find(id: UserId): Promise<User> {
    const user = await this.repository
      .createQueryBuilder()
      .where('User.id = :id', { id: id.value })
      .getOne();

    if (user === null) {
      throw new UserNotFoundError(
        `The user with id [${id.value}] has not been found in the database`,
      );
    }

    return User.create(
      user.id.value,
      user.name.value,
      user.mail.value,
      user.status.value,
    );
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.repository.find({});

    const mappedUsers: User[] = [];
    for (const user of users) {
      mappedUsers.push(
        User.create(
          user.id.value,
          user.name.value,
          user.mail.value,
          user.status.value,
        ),
      );
    }

    return mappedUsers;
  }

  async search(id: UserId): Promise<User | null> {
    const user = await this.repository
      .createQueryBuilder()
      .where('User.id = :id', { id: id.value })
      .getOne();

    if (user === null) return null;

    return User.create(
      user.id.value,
      user.name.value,
      user.mail.value,
      user.status.value,
    );
  }
  async delete(id: UserId): Promise<void> {
    await this.repository.delete(id.value);
  }
}
