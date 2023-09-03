import { validate } from 'uuid';
import { ValueObject } from './value-object';

export default class Uuid extends ValueObject<string> {
  constructor(value: string) {
    if (!validate(value)) {
      throw new Error('Invalid UUID');
    }
    super(value);
  }

  public equals(other: ValueObject<string>): boolean {
    if (!(other instanceof Uuid)) {
      return false;
    }
    return this.value === other.value;
  }
}
