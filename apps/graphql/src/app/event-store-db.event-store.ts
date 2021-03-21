import {
  FORWARDS,
  jsonEvent,
  NO_STREAM,
  START,
} from '@eventstore/db-client';
import { EventStore } from '@simple-jira/domain';

export function determineVersion(version) {
  return version === -1 ? NO_STREAM : BigInt(version);
}

export class EventStoreDBEventStore implements EventStore {
  constructor(private readonly client) {}

  async append(stream, events, version) {
    const expectedRevision = determineVersion(version);

    await this.client.appendToStream(
      stream,
      events.map(jsonEvent),
      { expectedRevision },
    );
  }

  async read(stream) {
    const jsonEvents = await this.client.readStream(stream, {
      direction: FORWARDS,
      fromRevision: START,
    });

    return jsonEvents.map((e) => {
      console.log(e);

      return {
        data: e.event.data,
        type: e.event.type,
      };
    });
  }
}
