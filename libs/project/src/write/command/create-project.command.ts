import { Command } from '@simple-jira/domain';

export interface CreateProjectCommand extends Command {
  projectId: string;
}
