import { Repository } from '@simple-jira/domain';
import { ProjectAggregate } from '../aggregate/project.aggregate';

export class ProjectRepository extends Repository<ProjectAggregate> {
  // eslint-disable-next-line class-methods-use-this
  getInstance() {
    return new ProjectAggregate();
  }
}
