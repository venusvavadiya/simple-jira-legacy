import { Repository } from '@simple-jira/domain';
import { Project } from './project.aggregate';

export class ProjectRepository extends Repository<Project> {}
