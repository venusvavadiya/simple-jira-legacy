import { Aggregate } from '@simple-jira/domain';
import { ProjectCreatedV1, ProjectRenamedV1 } from './events';

export class ProjectAggregate extends Aggregate {
  id: string;
  name: string;

  constructor(id: string) {
    super();
    const projectCreated = new ProjectCreatedV1(id);
    this.applyEvent(projectCreated);
  }

  rename(name: string) {
    const projectRenamed = new ProjectRenamedV1(this.id, name);
    this.applyEvent(projectRenamed);
  }

  // Events

  private applyProjectCreatedV1(event: ProjectCreatedV1) {
    this.id = event.projectId;
  }

  private applyProjectRenamedV1(event: ProjectRenamedV1) {
    this.name = event.name;
  }
}
