import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UsersController from './users.controller';
import UserCreator from '../../application/create/user-creator.application';
import UserRepository from '../../domain/repository/user.repository';
import TypeORMUserRepository from '../persistance/typeorm/repository/user-reposiory.typeorm';
import UserDeleter from '../../application/delete/user-deleter.application';
import PersonalInfoUpdater from '../../application/update/personal-info-updater.application';
import UserFinder from '../../application/find/user-finder.application';
import { UserSchema } from '../persistance/typeorm/schema/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeORMUserRepository,
    },
    {
      provide: UserCreator,
      useClass: UserCreator,
    },
    {
      provide: UserDeleter,
      useClass: UserDeleter,
    },
    {
      provide: PersonalInfoUpdater,
      useClass: PersonalInfoUpdater,
    },
    {
      provide: UserFinder,
      useClass: UserFinder,
    },
  ],
})
export default class UsersModule {}
