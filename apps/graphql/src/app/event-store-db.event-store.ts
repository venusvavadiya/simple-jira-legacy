import {
  EventStoreDBClient, FORWARDS,
  jsonEvent, NO_STREAM, START,
} from '@eventstore/db-client';
import { Event, EventStore } from '@simple-jira/domain';
import { v4 as uuidv4 } from 'uuid';

export class EventStoreDbEventStore implements EventStore {
  client

  constructor() {
    this.client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
  }

  // eslint-disable-next-line no-unused-vars
  async append(stream: string, events: Event[], version: number): Promise<void> {
    // const mappedEvents = events.map((x) => jsonEvent({ type: 'created', data: { ...x } }));
    // await this.client.appendToStream(stream, mappedEvents, { expectedRevision: version });

    const eventOne = jsonEvent({
      id: uuidv4(),
      type: 'some-evenat',
      data: {
        id: '1',
        value: 'some value',
      },
    });

    // const eventTwo = jsonEvent({
    //   id: uuidv4(),
    //   type: 'some-event',
    //   data: {
    //     id: '2',
    //     value: 'some other value',
    //   },
    // });

    await this.client.appendToStream('as-stream', eventOne).then(console.log);
  }

  async read(stream) {
    const events = await this.client.readStream(stream, {
      direction: FORWARDS,
      fromRevision: START,
    });

    events.forEach(console.log);

    return Promise.resolve([]);
  }
}
