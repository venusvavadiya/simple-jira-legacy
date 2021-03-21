import { Event, EventStore } from '@simple-jira/domain';

export class InMemoryEventStore implements EventStore {
  store = {}

  async append(stream: string, events: Event[], version: number): Promise<void> {
    const existing = this.store[stream] ?? [];
    this.store[stream] = [...existing, ...events];
    console.log('current', stream, this.store, version);
  }

  async read(stream) {
    return Promise.resolve(this.store[stream]);
  }
}
