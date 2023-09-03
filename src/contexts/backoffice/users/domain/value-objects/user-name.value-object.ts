import { ValueObject } from 'src/contexts/shared/domain/value-object/value-object';

export default class UserName extends ValueObject<string> {
  equals(other: UserName) {
    return this.value === other.value ? true : false;
  }
}
