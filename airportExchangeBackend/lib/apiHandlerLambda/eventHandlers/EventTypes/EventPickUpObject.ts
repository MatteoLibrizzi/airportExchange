import { EventObject } from './Event.interface';

export interface EventPickUpObject extends EventObject {
    imageS3Key: string,
    airportId: string,
}
