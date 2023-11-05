import { EventHandlerLeaveObject } from "../eventHandlers/EventHandlerLeaveObject"
import { DbHandler } from "../eventHandlers/dbHandler/DbHandler"
import { SignedUrlGenerator } from "../eventHandlers/signedUrls/SignedUrlGenerator"
import { expectedDescription, expectedLocation, expectedName, leaveObjectEvent } from "./resources/leaveObjectEvent"

test('Leave object event handler receives the correct parametres', async () => {
    const eventHandler = new EventHandlerLeaveObject()
    
    jest.spyOn(DbHandler,'getCurrentIndex').mockImplementation()
    jest.spyOn(DbHandler,'incrementCurrentIndex').mockImplementation()
    jest.spyOn(DbHandler, 'leaveObject').mockImplementation()
    jest.spyOn(SignedUrlGenerator,'getSignedUrlPut').mockImplementation()

    await eventHandler.handleEvent(leaveObjectEvent)

    expect(DbHandler.leaveObject).toHaveBeenCalledWith(expect.objectContaining({name: expectedName, description: expectedDescription, location: expectedLocation}))
})