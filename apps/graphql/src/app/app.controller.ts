import { Controller, Get } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { EventStoreDBEventStore } from './event-store-db.event-store';

@Controller()
export class AppController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  async getData() {
    const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
    const eventStore = new EventStoreDBEventStore(client);
    return {};
  }
}
