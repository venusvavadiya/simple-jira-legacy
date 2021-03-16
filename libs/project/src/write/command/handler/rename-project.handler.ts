import { ProjectRepository } from '../../repository';
import { RenameProjectCommand } from '../rename-project.command';

export class RenameProjectCommandHandler {
  constructor(private projectRepository: ProjectRepository) {}

  async handle(command: RenameProjectCommand) {
    const projectAggregate = await this.projectRepository.getById(command.projectId);
    projectAggregate.rename(command.name);
    this.projectRepository.save(projectAggregate);
  }
}
