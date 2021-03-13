import { ProjectAggregate } from '../../domain/project.aggregate';
import { ProjectRepository } from '../../domain/project.repository';

export interface CreateProjectCommand {
  projectId: string;
}

export class CreateProjectCommandHandler {
  constructor(private projectRepository: ProjectRepository) {}

  handle(command: CreateProjectCommand) {
    const projectAggregate = new ProjectAggregate(command.projectId);
    this.projectRepository.save(projectAggregate);
  }
}
