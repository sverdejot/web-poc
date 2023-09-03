import { NewableClass } from '../../../domain/newable-class';
import {
  Primitives,
  ValueObject,
} from '../../../domain/value-object/value-object';

/* eslint-disable @typescript-eslint/no-explicit-any  */
export const ValueObjectTransformer = <T extends Primitives>(
  ValueObject: NewableClass<ValueObject<any>>,
) => {
  return {
    to: (value: ValueObject<T>): T => {
      return value.value;
    },
    from: (value: T): ValueObject<T> => {
      return new ValueObject(value);
    },
  };
};
