import { Event } from '../../lib/event';

export class ProjectCreatedV1 extends Event {
  constructor(public readonly projectId: string) {
    super();
  }
}
