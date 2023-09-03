import { Primitives } from './value-object/value-object';

export default abstract class AggregateRoot {
  abstract toPrimitives(): { [key: string]: Primitives };
}
