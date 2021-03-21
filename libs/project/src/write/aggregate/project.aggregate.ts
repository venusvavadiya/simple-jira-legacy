import { Aggregate } from '@simple-jira/domain';
import { ProjectCreatedV1 } from '../event/project-created.event';
import { ProjectRenamedV1 } from '../event/project-renamed.event';

export class ProjectAggregate extends Aggregate {
  name: string;

  create(id: string) {
    const projectCreated = new ProjectCreatedV1(id);
    this.raiseEvent(projectCreated);
  }

  rename(name: string) {
    const projectRenamed = new ProjectRenamedV1(this.id, name);
    this.raiseEvent(projectRenamed);
  }

  // Events

  applyProjectCreatedV1(event: ProjectCreatedV1) {
    this.id = event.projectId;
  }

  applyProjectRenamedV1(event: ProjectRenamedV1) {
    this.name = event.name;
  }
}
