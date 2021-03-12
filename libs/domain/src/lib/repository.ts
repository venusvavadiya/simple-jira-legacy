import { Aggregate } from './aggregate';
import { EventStore } from './event-store';

export class Repositoy<T extends Aggregate> {
  readonly store: EventStore;

  async getById(id: string): Promise<T> {
    const events = await this.store.read(id);
    const instance = Aggregate.createInstance<T>();
    instance.loadFromEvents(events);
    return instance;
  }

  save(aggregate: T, version: number) {
    aggregate.changes.forEach((event) => {
      this.store.append(aggregate.id, event, version);
    });
  }
}
