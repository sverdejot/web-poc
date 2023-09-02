import UserId from 'src/contexts/shared/domain/value-object/user-id.value-object';
import User from '../entities/user.entity';

export default abstract class UserRepository {
  abstract save(user: User): Promise<void>;
  abstract find(id: UserId): Promise<User>;
  abstract search(id: UserId): Promise<User | null>;
  abstract delete(id: UserId): Promise<void>;
  abstract findAll(): Promise<User[]>;
}
