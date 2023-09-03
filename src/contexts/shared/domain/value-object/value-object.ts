import InvalidArgumentError from '../errors/invalid-argument-error';

export type Primitives = string | number | boolean | Primitives[];

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = this.IsDefined(value);
  }

  private IsDefined(value: T): T {
    if (value === undefined || value === null)
      throw new InvalidArgumentError('Value is undefined');
    return value;
  }

  toString(): string {
    return this.value.toString();
  }

  abstract equals(other: ValueObject<T>): boolean;
}
