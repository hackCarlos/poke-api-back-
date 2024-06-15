import { User } from '../User';

export interface UserRepository {
  save(user: User): Promise<void>;
  search({
    id,
    email,
    password,
  }: {
    id?: string;
    email?: string;
    password: string;
  }): Promise<Array<User>>;
  update(id: string, user: User): Promise<void>;
  delete(id: string): Promise<void>;
  search({
    id,
    email,
    password,
  }: {
    id?: string;
    email?: string;
    password?: string;
  }): Promise<Array<User>>;
}
