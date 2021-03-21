import { Event } from '../core/event';

export interface EventStore {
  append(stream: string, events: Event[], version: number): Promise<void>;
  read(stream: string): Promise<Event[]>;
}
