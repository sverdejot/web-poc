import UserCreator from 'src/contexts/backoffice/users/application/create/user-creator.application';
import MockUserRepository from '../../__mocks__/user-repository.mock';
import UserMother from '../../__mothers__/user.mother';

describe('UserCreator', () => {
  let userRepository: MockUserRepository;
  let userCreator: UserCreator;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    userCreator = new UserCreator(userRepository);
  });

  it('should create a user successfully', async () => {
    const user = UserMother.random();

    await userCreator.create({
      id: user.id.value,
      name: user.name.value,
      mail: user.mail.value,
      status: user.status.value,
    });

    userRepository.assertSaveCalledWith(user);
  });
});
