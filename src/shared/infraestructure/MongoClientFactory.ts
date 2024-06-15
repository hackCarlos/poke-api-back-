import { MongoClient } from 'mongodb';

export class MongoClientFactory {
  private static clients: { [key: string]: MongoClient } = {};

  static async createClient(
    contextName: string,
    url: string,
  ): Promise<MongoClient> {
    let client = MongoClientFactory.getClient(contextName);

    if (!client) {
      client = await MongoClientFactory.createAndConnectClient(url);
      MongoClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): MongoClient | null {
    return MongoClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(
    url: string,
  ): Promise<MongoClient> {
    const client = new MongoClient(url, { ignoreUndefined: true });
    await client.connect();

    return client;
  }

  private static registerClient(
    client: MongoClient,
    contextName: string,
  ): void {
    MongoClientFactory.clients[contextName] = client;
  }
}
