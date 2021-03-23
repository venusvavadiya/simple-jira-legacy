import { Controller, Get } from '@nestjs/common';
import { EventStoreDBClient } from '@eventstore/db-client';
import { EventStoreDBEventStore } from './event-store-db.event-store';

import { ProjectRepository, CreateProjectCommandHandler, RenameProjectCommandHandler } from '@simple-jira/project';

@Controller()
export class AppController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  async getData() {
    try {
      const client = EventStoreDBClient.connectionString('esdb://localhost:2113?tls=false');
      const eventStore = new EventStoreDBEventStore(client);

      const projectRepository = new ProjectRepository(eventStore);

      const createProjectCommandHandler = new CreateProjectCommandHandler(projectRepository);
      const renameProjectCommandHandler = new RenameProjectCommandHandler(projectRepository);

      // const createProjectCommand = { projectId: 'foo-13', timestamp: new Date() };
      // await createProjectCommandHandler.handle(createProjectCommand);

      const renameProjectCommand = { projectId: 'foo-13', name: 'Tom', timestamp: new Date() };
      await renameProjectCommandHandler.handle(renameProjectCommand);
    } catch (e) {
      console.log(e);
    }

    return {};
  }
}
