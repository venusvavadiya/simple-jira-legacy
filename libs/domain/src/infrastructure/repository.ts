import { Aggregate } from '../core/aggregate';
import { EventStore } from './event-store';

export function toJsonEvent(event) {
  const data = JSON.parse(JSON.stringify(event));
  const type = event.constructor.name;
  return { data, type };
}

export abstract class Repository<T extends Aggregate> {
  constructor(private readonly store: EventStore) {}

  abstract getInstance(): T

  async getById(id: string): Promise<T> {
    const aggregate = this.getInstance();
    const events = await this.store.read(`${aggregate.constructor.name}-${id}`);
    events.forEach((event) => { aggregate.applyEvent(event); });
    return aggregate;
  }

  async save(aggregate: T): Promise<void> {
    const stream = `${aggregate.constructor.name}-${aggregate.id}`;
    const storedVersion = aggregate.version - aggregate.changes.length;
    await this.store.append(stream, aggregate.changes.map(toJsonEvent), storedVersion);
    aggregate.resetChanges();
  }
}
