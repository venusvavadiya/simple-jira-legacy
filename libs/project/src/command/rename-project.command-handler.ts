import { ProjectRepository } from '../domain/project.repository';

export interface RenameProjectCommand {
  projectId: string;
  version: number;
  name: string;
}

export class RenameProjectCommandHandler {
  constructor(private projectRepository: ProjectRepository) {}

  async handle(command: RenameProjectCommand) {
    const projectAggregate = await this.projectRepository.getById(command.projectId);
    projectAggregate.rename(command.name);
    this.projectRepository.save(projectAggregate);
  }
}
