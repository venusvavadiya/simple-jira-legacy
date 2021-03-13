import { Event } from './event';

export class Aggregate {
  id: string;
  changes: Event[];
  version = -1;

  loadFromEvents(events: Event[]): void {
    events.forEach(this.applyEvent);
  }

  resetChanges(): void {
    this.changes = [];
  }

  protected raiseEvent(event: Event): void {
    this.applyEvent(event);
    this.changes.push(event);
  }

  private applyEvent(event: Event): void {
    const eventName = event.constructor.name;
    const methodName = `apply${eventName}`;
    this[methodName](event);
    this.version += 1;
  }
}
