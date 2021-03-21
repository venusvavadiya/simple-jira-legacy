import { Aggregate } from '../core/aggregate';
import { EventStore } from './event-store';

export class Repository<T extends Aggregate> {
  readonly aggregate: string;

  constructor(private readonly store: EventStore) {}

  async getById(id: string): Promise<T> {
    const aggregate = new Aggregate() as T;
    const events = await this.store.read(`${this.aggregate}-${id}`);
    // @ts-ignore
    const t = events[0].type;
    console.log('agg', aggregate);
    console.log(events);
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
