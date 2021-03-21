import { Event } from '../core/event';
import { JsonEvent } from '../core/JsonEvent';

export interface EventStore {
  append(stream: string, events: JsonEvent<Event>[], version: number): Promise<void>;
  read(stream: string): Promise<JsonEvent<Event>[]>;
}
