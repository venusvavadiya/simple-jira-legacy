import { Event } from '@simple-jira/domain';

export class ProjectCreatedV1 extends Event {
  constructor(
    readonly projectId: string,
    timestamp = new Date(),
  ) {
    super(timestamp);
  }
}
