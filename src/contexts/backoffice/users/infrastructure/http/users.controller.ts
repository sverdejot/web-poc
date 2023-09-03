import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import UserCreator from '../../application/create/user-creator.application';
import UserDeleter from '../../application/delete/user-deleter.application';
import PersonalInfoUpdater from '../../application/update/personal-info-updater.application';
import CreateUserRequest from './request/create-user.request';
import UpdatePersonalInfoRequest from './request/update-personal-info.request';
import { ApiTags } from '@nestjs/swagger';
import UserFinder from '../../application/find/user-finder.application';
import UserNotFoundError from '../../domain/errors/user-not-found.error';
import { HttpException } from '@nestjs/common';

@ApiTags('users')
@Controller('user')
export default class UsersController {
  readonly #userCreator: UserCreator;
  readonly #userDeleter: UserDeleter;
  readonly #personalInfoUpdater: PersonalInfoUpdater;
  readonly #userFinder: UserFinder;

  private readonly logger: Logger = new Logger(UsersController.name);

  constructor(
    userCreator: UserCreator,
    userDeleter: UserDeleter,
    personalInfoUpdater: PersonalInfoUpdater,
    userFinder: UserFinder,
  ) {
    this.#userCreator = userCreator;
    this.#userDeleter = userDeleter;
    this.#personalInfoUpdater = personalInfoUpdater;
    this.#userFinder = userFinder;
  }

  @Get()
  @HttpCode(HttpStatus.FOUND)
  async findAllUsers() {
    this.logger.log('Trying to find all users');
    const users = await this.#userFinder.findAll();
    users.forEach((user) => user.toPrimitives());
    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  async findUser(@Param('id') id: string) {
    this.logger.log(`Trying to find user with id [${id}]`);
    try {
      return (await this.#userFinder.find(id)).toPrimitives();
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Param('id') id: string, @Body() req: CreateUserRequest) {
    this.logger.log(`Trying to create user with id [${id}]`);
    await this.#userCreator.create({
      id: id,
      name: req.name,
      mail: req.mail,
      status: req.status,
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateUserProperties(
    @Param('id') id: string,
    @Body() req: UpdatePersonalInfoRequest,
  ) {
    this.logger.log(`Trying to update personal info for user with id [${id}]`);
    await this.#personalInfoUpdater.update({
      id: id,
      newMail: req.name,
      newName: req.mail,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    this.logger.log(`Trying to delete user with id [${id}]`);
    await this.#userDeleter.delete({ id });
  }
}
