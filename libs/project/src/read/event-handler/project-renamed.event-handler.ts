import { ProjectRenamedV1 } from '../../write';
import { ProjectRepository } from '../repository';

export class ProjectRenamedV1EventHandler {
  constructor(private projectRepository: ProjectRepository) {}

  async handle(event: ProjectRenamedV1) {
    const projectEntity = await this.projectRepository.getById(event.projectId);
    projectEntity.name = event.name;
    this.projectRepository.save(projectEntity);
  }
}
