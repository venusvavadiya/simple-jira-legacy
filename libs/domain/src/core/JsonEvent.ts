import { Event } from './event';

export interface JsonEvent<T extends Event> {
  type: string
  data: T
}
