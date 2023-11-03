import { getEventObject, getEventType } from "../utils"
import { eventWithExampleTypeAndExampleObject, expectedEventObject, expectedEventType } from "./resources/sampleEvents"

test('event parsing happens successfully', () => {
    const receivedEventType = getEventType(eventWithExampleTypeAndExampleObject)

    expect(receivedEventType).toEqual(expectedEventType)

    const receivedEventObject = getEventObject(eventWithExampleTypeAndExampleObject)

    expect(receivedEventObject).toEqual(JSON.parse(expectedEventObject))
})