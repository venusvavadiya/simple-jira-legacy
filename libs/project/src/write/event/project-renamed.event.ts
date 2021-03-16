import { Event } from '@simple-jira/domain';

export class ProjectRenamedV1 extends Event {
  constructor(
    readonly projectId: string,
    readonly name: string,
    timestamp = new Date(),
  ) {
    super(timestamp);
  }
}
