import { Event } from '@simple-jira/domain';

export class ProjectRenamedV1 implements Event {
  constructor(
    readonly projectId: string,
    readonly name: string,
    readonly timestamp = new Date(),
  ) {}
}
