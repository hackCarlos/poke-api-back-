import { Inject } from '@nestjs/common';
import { Collection, MongoClient, ObjectId } from 'mongodb';
import { User } from 'src/domain/User';

import { UserRepository } from 'src/domain/repositories/UserRepository';

export class MongoUserRepository implements UserRepository {
  constructor(
    @Inject('MongoConnection')
    private readonly client: Promise<MongoClient>,
  ) {}

  COLLECTION_NAME = 'users';

  public async search({
    id,
    email,
    password,
  }: {
    id?: string;
    email?: string;
    password?: string;
  }): Promise<Array<User>> {
    const collection = await this.collection();

    const filter: any = {};
    if (id) {
      filter._id = new ObjectId(id);
    }

    if (email) {
      filter.$and = [{ email }];
    }

    if (password) {
      filter.$and.push({ password });
    }

    console.log(filter);

    const documents = await collection.find(filter).toArray();

    return documents
      ? documents.map(
          (document) =>
            new User({
              id: document._id.toString(),
              email: document.email,
              isAdmin: document.isAdmin,
              geolocation: document.geolocation,
              pokemons: document.pokemons,
              name: document.name,
            }),
        )
      : [];
  }

  public async save(user: User): Promise<void> {
    return this.persist(user.id, user);
  }

  private async persist(id: string, user: User): Promise<void> {
    const collection = await this.collection();
    const document = {
      ...user,
      id: undefined,
      _id: new ObjectId(id || undefined),
    };

    await collection.insertOne(document);
  }

  public async update(id: string, user: User): Promise<void> {
    const collection = await this.collection();

    const newDocument = {
      ...user,
      id: undefined,
    };

    console.log(newDocument);
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: newDocument },
    );
  }

  public async delete(id: string): Promise<void> {
    const collection = await this.collection();

    await collection.deleteOne({ _id: new ObjectId(id) });
  }

  private async collection(): Promise<Collection> {
    return (await this.client).db().collection(this.COLLECTION_NAME);
  }
}
