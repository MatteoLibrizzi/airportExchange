import { EventObject } from './Event.interface';

export interface EventLeaveObject extends EventObject {
    name: string,
    description: string,
    location: string,
    airportId: string,
    imageBytes: number,
}
