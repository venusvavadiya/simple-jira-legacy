import { ProjectEntity } from '../entity/project.entity';

export interface ProjectRepository {
  save(entity: ProjectEntity): void;
  getById(projectId: string): Promise<ProjectEntity>
}
