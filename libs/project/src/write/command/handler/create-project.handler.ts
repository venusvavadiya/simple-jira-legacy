import { CommandHandler } from '@simple-jira/domain';
import { ProjectAggregate } from '../../aggregate/project.aggregate';
import { ProjectRepository } from '../../repository/project.repository';
import { CreateProjectCommand } from '../create-project.command';

export class CreateProjectCommandHandler implements CommandHandler<CreateProjectCommand> {
  constructor(private projectRepository: ProjectRepository) {}

  async handle(command: CreateProjectCommand): Promise<void> {
    const projectAggregate = new ProjectAggregate(command.projectId);
    await this.projectRepository.save(projectAggregate);
  }
}
