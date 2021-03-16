import { ProjectEntity } from '../entity';

export interface ProjectRepository {
  getById(projectId: string): Promise<ProjectEntity>;
  save(entity: ProjectEntity): void;
}
