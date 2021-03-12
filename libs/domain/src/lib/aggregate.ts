import { Event } from './event';

export abstract class Aggregate {
  id: string;
  changes: Event[];
  version = 0;

  loadFromEvents(events: Event[]) {
    events.forEach((event) => {
      this.applyEvent(event, true);
    });
  }

  markAsCommited() {
    this.changes = [];
  }

  protected applyEvent(event: Event, isCommited = false) {
    const eventName = event.constructor.name;
    const methodName = `apply${eventName}`;
    this[methodName](event);
    if (!isCommited) this.changes.push(event);
  }
}
