import { Aggregate } from './aggregate';
import { EventStore } from './event-store';

export class Repository<T extends Aggregate> {
  readonly store: EventStore;

  async getById(id: string): Promise<T> {
    const events = await this.store.read(id);
    const instance = Aggregate.createInstance<T>();
    instance.loadFromEvents(events);
    return instance;
  }

  save(aggregate: T, version = 0) {
    aggregate.changes.forEach((event, index) => {
      this.store.append(aggregate.id, event, version + index);
    });
    aggregate.markAsCommited();
  }
}
