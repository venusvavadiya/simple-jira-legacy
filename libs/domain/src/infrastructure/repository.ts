import { Aggregate } from '../core/aggregate';
import { EventStore } from './event-store';

export class Repository<T extends Aggregate> {
  constructor(private readonly store: EventStore) {}

  // eslint-disable-next-line class-methods-use-this
  getInstance() {
    return null;
  }

  async getById(id: string): Promise<T> {
    const aggregate = this.getInstance();
    const events = await this.store.read(`${aggregate.constructor.name}-${id}`);
    events.forEach(aggregate.applyEvent);
    return aggregate;
  }

  async save(aggregate: T): Promise<void> {
    const stream = `${aggregate.constructor.name}-${aggregate.id}`;
    const storedVersion = aggregate.version - aggregate.changes.length;
    await this.store.append(stream, aggregate.changes, storedVersion);
    aggregate.resetChanges();
  }
}
