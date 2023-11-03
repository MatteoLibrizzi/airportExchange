import { EventResponse } from "./EventResponse.interface";

export interface EventResponseGetSignedUrl extends EventResponse {
    signedUrl: string
}