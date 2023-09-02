import UserId from 'src/contexts/shared/domain/value-object/user-id.value-object';
import UserEmail from '../value-objects/user-email.value-objects';
import UserName from '../value-objects/user-name.value-object';
import UserStatus from '../value-objects/user-status.value-object';
import AggregateRoot from 'src/contexts/shared/domain/aggregate-root';
import { Primitives } from 'src/contexts/shared/domain/value-object/value-object';

export default class User extends AggregateRoot {
  readonly #id: UserId;
  #name: UserName;
  #mail: UserEmail;
  #status: UserStatus;

  private constructor(
    id: UserId,
    name: UserName,
    mail: UserEmail,
    status: UserStatus,
  ) {
    super();
    this.#id = id;
    this.#name = name;
    this.#mail = mail;
    this.#status = status;
  }

  public static create(
    id: string,
    name: string,
    mail: string,
    status: boolean,
  ) {
    const userId = new UserId(id);
    const userName = new UserName(name);
    const userMail = new UserEmail(mail);
    const userStatus = new UserStatus(status);

    return new User(userId, userName, userMail, userStatus);
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get mail() {
    return this.#mail;
  }

  get status() {
    return this.#status;
  }

  public updatePersonalInfo(name?: string, mail?: string): void {
    if (name !== undefined) {
      this.#name = new UserName(name);
    }
    if (mail !== undefined) {
      this.#mail = new UserEmail(mail);
    }
  }

  toPrimitives(): { [key: string]: Primitives } {
    return {
      id: this.#id.value,
      name: this.#name.value,
      mail: this.#mail.value,
      status: this.#status.value,
    };
  }
}
