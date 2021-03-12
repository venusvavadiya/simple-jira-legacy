import { Event } from '@simple-jira/domain';

export class ProjectRenamedV1 extends Event {
  constructor(
    public readonly projectId: string,
    public readonly name: string,
  ) {
    super();
  }
}
