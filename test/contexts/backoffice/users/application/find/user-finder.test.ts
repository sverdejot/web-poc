import UserFinder from 'src/contexts/backoffice/users/application/find/user-finder.application';
import MockUserRepository from '../../__mocks__/user-repository.mock';
import UserMother from '../../__mothers__/user.mother';

describe('UserFinder', () => {
  let userFinder: UserFinder;
  let mockUserRepository: MockUserRepository;

  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    userFinder = new UserFinder(mockUserRepository);
  });

  describe('find', () => {
    it('should return a user if it exists', async () => {
      const expectedUser = UserMother.random();
      const userId = expectedUser.id.value;
      mockUserRepository.returnWhenSearchCalled(expectedUser);

      const user = await userFinder.find(userId);

      expect(user).toEqual(expectedUser);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedUsers = [UserMother.random(), UserMother.random()];
      mockUserRepository.returnWhenFindAllCalled(expectedUsers);

      const users = await userFinder.findAll();

      expect(users).toEqual(expectedUsers);
    });
  });
});
