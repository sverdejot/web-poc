import PersonalInfoUpdater from 'src/contexts/backoffice/users/application/update/personal-info-updater.application';
import MockUserRepository from '../../__mocks__/user-repository.mock';
import UserMother from '../../__mothers__/user.mother';

describe('PersonalInfoUpdater', () => {
  let personalInfoUpdater: PersonalInfoUpdater;
  let userRepository: MockUserRepository;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    personalInfoUpdater = new PersonalInfoUpdater(userRepository);
  });

  it('should update a user personal info successfully', async () => {
    // given
    const user = UserMother.random();
    userRepository.returnWhenFindCalled(user);

    const newName = 'Updated User';
    const newMail = 'updated@mail.com';

    // when
    await personalInfoUpdater.update({
      id: user.id.value,
      newName: newName,
      newMail: newMail,
    });

    // then
    const updatedUser = await userRepository.find(user.id);

    expect(updatedUser.name.value).toBe(newName);
    expect(updatedUser.mail.value).toBe(newMail);
  });
});
