import { ProjectAggregate } from '../../aggregate';
import { ProjectRepository } from '../../repository';
import { CreateProjectCommand } from '../create-project.command';

export class CreateProjectCommandHandler {
  constructor(private projectRepository: ProjectRepository) {}

  handle(command: CreateProjectCommand) {
    const projectAggregate = new ProjectAggregate(command.projectId);
    this.projectRepository.save(projectAggregate);
  }
}
