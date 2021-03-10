// eslint-disable-next-line import/no-unresolved
import { Event } from '@simple-jira/domain';

export class ProjectCreatedV1 extends Event {
  constructor(public readonly projectId: string) {
    super();
  }
}
