import { Aggregate } from '../core/aggregate';
import { EventStore } from './event-store';

export abstract class Repository<T extends Aggregate> {
  readonly store: EventStore;

  async getById(id: string): Promise<T> {
    const aggregate = new Aggregate() as T;
    const events = await this.store.read(id);
    events.forEach(aggregate.applyEvent);
    return aggregate;
  }

  async save(aggregate: T): Promise<void> {
    const storedVersion = aggregate.version - aggregate.changes.length;
    await this.store.append(aggregate.id, aggregate.changes, storedVersion);
    aggregate.resetChanges();
  }
}
