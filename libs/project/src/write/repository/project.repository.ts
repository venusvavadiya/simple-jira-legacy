import { Repository } from '@simple-jira/domain';
import { ProjectAggregate } from '../aggregate/project.aggregate';

export class ProjectRepository extends Repository<ProjectAggregate> {
  readonly aggregate = 'ProjectAggregate';
}
