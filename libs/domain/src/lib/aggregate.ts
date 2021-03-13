import { Event } from './event';

export class Aggregate {
  id: string;
  changes: Event[];
  version = 0;

  loadFromEvents(events: Event[]): void {
    events.forEach((event) => {
      this.applyEvent(event, true);
    });
  }

  markAsCommited(): void {
    this.changes = [];
  }

  protected applyEvent(event: Event, isCommited = false): void {
    const eventName = event.constructor.name;
    const methodName = `apply${eventName}`;
    this[methodName](event);
    if (!isCommited) this.changes.push(event);
  }
}
