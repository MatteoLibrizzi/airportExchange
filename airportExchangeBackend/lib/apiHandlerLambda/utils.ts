
export const getEventType = (event: any) => {
    const eventBody = JSON.parse(event.body)
    const eventType = eventBody.eventType
    return eventType
}

export const getEventObject = (event: any) => {
    const eventBody = JSON.parse(event.body)
    const eventObject = JSON.parse(eventBody.eventObject)
    return eventObject
}