import UserDeleter from 'src/contexts/backoffice/users/application/delete/user-deleter.application';
import UserId from 'src/contexts/shared/domain/value-object/user-id.value-object';
import MockUserRepository from '../../__mocks__/user-repository.mock';

describe('UserDeleter', () => {
  let userDeleter: UserDeleter;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    userDeleter = new UserDeleter(userRepository);
  });

  it('should delete a user', async () => {
    // given
    const id = new UserId('765EF024-C0FC-468C-920D-EAEBFD951E46');

    // when
    await userDeleter.delete({ id: id.value });

    // then
    userRepository.assertDeleteCalledWith(id);
  });
});
