import User from 'src/contexts/backoffice/users/domain/entities/user.entity';
import UserRepository from 'src/contexts/backoffice/users/domain/repository/user.repository';
import UserId from 'src/contexts/shared/domain/value-object/user-id.value-object';

export default class MockUserRepository implements UserRepository {
  saveMock = jest.fn();
  findMock = jest.fn();
  searchMock = jest.fn();
  deleteMock = jest.fn();
  findAllMock = jest.fn();

  returnWhenFindCalled(user: User): void {
    this.findMock.mockReturnValue(user);
  }

  returnWhenFindAllCalled(users: User[]): void {
    this.findAllMock.mockReturnValue(users);
  }

  returnWhenSearchCalled(user: User): void {
    this.searchMock.mockReturnValue(user);
  }

  async save(user: User): Promise<void> {
    this.saveMock(user);
  }

  async find(id: UserId): Promise<User> {
    return this.findMock(id);
  }

  async findAll(): Promise<User[]> {
    return this.findAllMock();
  }

  async search(id: UserId): Promise<User | null> {
    return this.searchMock(id);
  }

  async delete(id: UserId): Promise<void> {
    this.deleteMock(id);
  }

  assertFindCalledWith(id: UserId) {
    expect(this.findMock).toHaveBeenCalledWith(id);
  }

  assertSearchCalledWith(id: UserId) {
    expect(this.searchMock).toHaveBeenCalledWith(id);
  }

  assertDeleteCalledWith(id: UserId) {
    expect(this.deleteMock).toHaveBeenCalledWith(id);
  }

  assertSaveCalledWith(user: User) {
    expect(this.saveMock).toHaveBeenCalledWith(user);
  }
}
