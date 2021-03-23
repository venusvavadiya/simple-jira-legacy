import { Event } from './event';
import { JsonEvent } from './JsonEvent';

export function toJsonEvent(event) {
  const data = JSON.parse(JSON.stringify(event));
  const type = event.constructor.name;
  return { data, type };
}

export class Aggregate {
  id: string
  changes: Event[] = []
  version = -1

  applyEvent(event: JsonEvent<Event>): void {
    const methodName = `apply${event.type}`;
    this[methodName](event.data);
    this.version += 1;
  }

  raiseEvent(event: Event): void {
    this.applyEvent(toJsonEvent(event));
    this.changes.push(event);
  }

  resetChanges(): void {
    this.changes = [];
  }
}
