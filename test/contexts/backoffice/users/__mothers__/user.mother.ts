import User from 'src/contexts/backoffice/users/domain/entities/user.entity';
import { v4 } from 'uuid';

export default class UserMother {
  private id: string;
  private name: string;
  private mail: string;
  private status: boolean;

  constructor() {
    this.id = v4();
    this.name = 'default-name';
    this.mail = 'default-mail';
    this.status = true;
  }

  withId(id: string): UserMother {
    this.id = id;
    return this;
  }

  withName(name: string): UserMother {
    this.name = name;
    return this;
  }

  withMail(mail: string): UserMother {
    this.mail = mail;
    return this;
  }

  withStatus(status: boolean): UserMother {
    this.status = status;
    return this;
  }

  build(): User {
    return User.create(this.id, this.name, this.mail, this.status);
  }

  static random(): User {
    return new UserMother().build();
  }
}
