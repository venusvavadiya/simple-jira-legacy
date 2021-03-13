import { ProjectCreatedV1 } from '../../domain/events';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectRepository } from '../repository/ProjectRepository';

export class ProjectCreatedV1EventHandler {
  constructor(private projectRepository: ProjectRepository) {}

  handle(event: ProjectCreatedV1) {
    const { projectId } = event;
    const projectEntity: ProjectEntity = { id: projectId };
    this.projectRepository.save(projectEntity);
  }
}