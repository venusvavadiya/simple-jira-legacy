import { Event } from '../core/event';

export interface EventStore {
  append(stream: string, event: Event[], version: number): Promise<void>;
  read(stream: string): Promise<Event[]>;
}
