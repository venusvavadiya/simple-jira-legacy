import {
  EventStoreDBClient,
  FORWARDS,
  jsonEvent,
  JSONType,
  START,
} from '@eventstore/db-client';
import { Event, EventStore } from '@simple-jira/domain';

export class EventStoreDbEventStore implements EventStore {
  client

  constructor() {
    this.client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
  }

  async append(stream: string, events: Event[], version: number): Promise<void> {
    const mapped = events
      .map((x) => jsonEvent({ type: x.constructor.name, data: x as unknown as JSONType }));
    await this.client.appendToStream(stream, mapped, { expectedRevision: version });
  }

  read(stream) {
    return this.client.readStream(stream, {
      direction: FORWARDS,
      fromRevision: START,
    });
  }
}
