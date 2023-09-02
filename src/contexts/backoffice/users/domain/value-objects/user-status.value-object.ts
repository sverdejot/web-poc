import { ValueObject } from 'src/contexts/shared/domain/value-object/value-object';

export default class UserStatus extends ValueObject<boolean> {
  equals(other: UserStatus) {
    return this.value === other.value ? true : false;
  }
}
