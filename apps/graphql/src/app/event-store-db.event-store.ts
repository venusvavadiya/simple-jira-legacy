import {
  FORWARDS,
  NO_STREAM,
  START,
} from '@eventstore/db-client';

export class EventStoreDBEventStore {
  constructor(private readonly client) {}

  async append(stream, events, version) {
    const expectedRevision = version === -1 ? NO_STREAM : BigInt(version);

    await this.client.appendToStream(
      stream,
      events,
      { expectedRevision },
    );
  }

  async read(stream) {
    const events = await this.client.readStream(stream, {
      direction: FORWARDS,
      fromRevision: START,
    });

    return events;
  }
}
