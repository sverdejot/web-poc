import User from 'src/contexts/backoffice/users/domain/entities/user.entity';
import UserEmail from 'src/contexts/backoffice/users/domain/value-objects/user-email.value-objects';
import UserName from 'src/contexts/backoffice/users/domain/value-objects/user-name.value-object';
import UserStatus from 'src/contexts/backoffice/users/domain/value-objects/user-status.value-object';
import UserId from 'src/contexts/shared/domain/value-object/user-id.value-object';
import { ValueObjectTransformer } from 'src/contexts/shared/infrastructure/persistance/typeorm/value-object-transformer';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  columns: {
    id: {
      primary: true,
      type: String,
      transformer: ValueObjectTransformer(UserId),
    },
    name: {
      type: String,
      transformer: ValueObjectTransformer(UserName),
    },
    mail: {
      type: String,
      transformer: ValueObjectTransformer(UserEmail),
    },
    status: {
      type: Boolean,
      transformer: ValueObjectTransformer(UserStatus),
    },
  },
});
