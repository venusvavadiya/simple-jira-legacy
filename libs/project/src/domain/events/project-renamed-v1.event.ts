import { Event } from '@simple-jira/domain';

export class ProjectRenamedV1 extends Event {
  constructor(public readonly name: string) {
    super();
  }
}
