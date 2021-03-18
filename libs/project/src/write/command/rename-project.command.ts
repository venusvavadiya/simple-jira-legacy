import { Command } from '@simple-jira/domain';

export interface RenameProjectCommand extends Command {
  projectId: string;
  name: string;
}
