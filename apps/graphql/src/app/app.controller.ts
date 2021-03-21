import { Controller, Get } from '@nestjs/common';
import {
  CreateProjectCommandHandler,
  ProjectRepository,
} from '@simple-jira/project';
import { EventStoreDbEventStore } from './event-store-db.event-store';

@Controller()
export class AppController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  async getData() {
    try {
      const createProjectCommand = { projectId: 'id', timestamp: new Date() };
      const eventStore = new EventStoreDbEventStore();
      const projectRepository = new ProjectRepository(eventStore);
      const createProjectCommandHandler = new CreateProjectCommandHandler(projectRepository);
      await createProjectCommandHandler.handle(createProjectCommand);
      return {};
    } catch (e) {
      console.log(e);
    }
  }
}
