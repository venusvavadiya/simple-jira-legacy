import { Aggregate } from './aggregate';
import { EventStore } from './event-store';

export class Repository<T extends Aggregate> {
  readonly store: EventStore;

  async getById(id: string): Promise<T> {
    const events = await this.store.read(id);
    const instance = new Aggregate() as T;
    instance.loadFromEvents(events);
    return instance;
  }

  async save(aggregate: T, version): Promise<void> {
    await this.store.append(aggregate.id, aggregate.changes, version);
    aggregate.markAsCommited();
  }
}
