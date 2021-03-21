import { Repository } from '@simple-jira/domain';
import { ProjectAggregate } from '../aggregate/project.aggregate';

export class ProjectRepository extends Repository<ProjectAggregate> {
  getInstance() {
    return new ProjectAggregate();
  }
}
