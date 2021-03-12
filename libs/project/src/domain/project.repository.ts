import { Repository } from '@simple-jira/domain';
import { ProjectAggregate } from './project.aggregate';

export class ProjectRepository extends Repository<ProjectAggregate> {}
