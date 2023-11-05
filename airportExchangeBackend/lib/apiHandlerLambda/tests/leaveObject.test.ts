import { EventHandlerLeaveObject } from "../eventHandlers/EventHandlerLeaveObject"
import { DbHandler } from "../eventHandlers/dbHandler/DbHandler"
import { expectedDescription, expectedLocation, expectedName, leaveObjectEvent } from "./resources/leaveObjectEvent"

test('Leave object event handler receives the correct parametres', () => {
    const eventHandler = new EventHandlerLeaveObject()

    jest.spyOn(DbHandler, 'leaveObject')

    eventHandler.handleEvent(leaveObjectEvent)

    expect(DbHandler.leaveObject).toHaveBeenCalledWith(expect.objectContaining({name: expectedName, description: expectedDescription, location: expectedLocation}))
})