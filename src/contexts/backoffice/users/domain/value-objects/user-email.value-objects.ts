import { ValueObject } from 'src/contexts/shared/domain/value-object/value-object';

export default class UserEmail extends ValueObject<string> {
  equals(other: UserEmail) {
    return this.value === other.value ? true : false;
  }
}
