import { Aggregate } from '@simple-jira/domain';
import { ProjectCreatedV1 } from './events';

export class Project extends Aggregate {
  constructor(id: string) {
    super();
    const projectCreated = new ProjectCreatedV1(id);
    this.applyEvent(projectCreated);
  }

  applyProjectCreatedV1(event: ProjectCreatedV1) {
    this.id = event.projectId;
  }
}
