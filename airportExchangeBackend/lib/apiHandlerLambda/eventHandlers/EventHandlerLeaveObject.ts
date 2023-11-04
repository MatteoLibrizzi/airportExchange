import { EventHandler } from "./EventHandler.interface";
import { EventLeaveObject } from "./EventTypes/EventLeaveObject";
import { EventResponseLeaveObject } from "./ResponseTypes/EventResponseLeaveObject";

export class EventHandlerLeaveObject implements EventHandler<EventLeaveObject, EventResponseLeaveObject> {
    handleEvent = (input: EventLeaveObject) => {
        console.log(`Handling event Leave Object with input ${JSON.stringify(input)}`)
        return {}
    }
}