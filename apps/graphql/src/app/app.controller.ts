import { Controller, Get } from '@nestjs/common';
import {
  CreateProjectCommandHandler,
  ProjectRepository,
  RenameProjectCommandHandler,
} from '@simple-jira/project';
import { EventStoreDbEventStore } from './event-store-db.event-store';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class AppController {
  @Get()
  // eslint-disable-next-line class-methods-use-this
  async getData() {
    try {
      const eventStore = new EventStoreDbEventStore();
      const projectRepository = new ProjectRepository(eventStore);

      // const createProjectCommand = { projectId: 'id2', timestamp: new Date() };
      // const createProjectCommandHandler = new CreateProjectCommandHandler(projectRepository);
      // await createProjectCommandHandler.handle(createProjectCommand);

      const renameProjectCommand = { projectId: 'id2', name: 'foo', timestamp: new Date() };
      const renameProjectCommandHandler = new RenameProjectCommandHandler(projectRepository);
      await renameProjectCommandHandler.handle(renameProjectCommand);

      return {};
    } catch (e) {
      console.log(e);
    }
  }
}
