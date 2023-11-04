import { SignedURLMethod } from "../../eventHandlers/EventTypes/EventGetSingedUrl"

export const expectedObjectKey = 'expectedObjectKey'

export const eventGetSignedUrlGet = {
    objectKey: expectedObjectKey,
    method: SignedURLMethod.GET
}

export const eventGetSignedUrlPut = {
    objectKey: expectedObjectKey,
    method: SignedURLMethod.PUT,
    contentLength: 2,
}