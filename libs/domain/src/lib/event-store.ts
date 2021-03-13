import { Event } from './event';

export interface EventStore {
  append(stream: string, event: Event[], version: number): void;
  read(stream: string): Promise<Event[]>;
}
