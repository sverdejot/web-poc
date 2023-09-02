import { ValueObject } from './value-object';

export default class GenericDate extends ValueObject<number> {
  constructor(readonly value: number) {
    super(value);
  }

  public static fromDate(date: Date): GenericDate {
    return new GenericDate(date.getTime());
  }

  public toDate(): Date {
    return new Date(this.value);
  }

  public equals(other: ValueObject<number>): boolean {
    if (!(other instanceof GenericDate)) {
      return false;
    }
    return this.value === other.value;
  }
}
