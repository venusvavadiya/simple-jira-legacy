import { Event } from './event';

export class Aggregate {
  id: string;
  changes: Event[] = [];
  version = -1;

  applyEvent(event: Event): void {
    const eventName = event.constructor.name;
    const methodName = `apply${eventName}`;
    console.log('this', this);
    this[methodName](event);
    this.version += 1;
  }

  raiseEvent(event: Event): void {
    this.applyEvent(event);
    this.changes.push(event);
  }

  resetChanges(): void {
    this.changes = [];
  }
}
