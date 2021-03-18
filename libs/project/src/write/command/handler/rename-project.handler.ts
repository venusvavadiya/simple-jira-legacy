import { CommandHandler } from '@simple-jira/domain';
import { ProjectRepository } from '../../repository/project.repository';
import { RenameProjectCommand } from '../rename-project.command';

export class RenameProjectCommandHandler implements CommandHandler<RenameProjectCommand> {
  constructor(private projectRepository: ProjectRepository) {}

  async handle(command: RenameProjectCommand): Promise<void> {
    const projectAggregate = await this.projectRepository.getById(command.projectId);
    projectAggregate.rename(command.name);
    await this.projectRepository.save(projectAggregate);
  }
}
