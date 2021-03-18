import { Event } from '@simple-jira/domain';

export class ProjectCreatedV1 implements Event {
  constructor(
    readonly projectId: string,
    readonly timestamp = new Date(),
  ) {}
}
