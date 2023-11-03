import { EventObject } from './Event.interface';
export enum SignedURLMethod {
    PUT = 'put',
    GET = 'get',
}
export interface EventGetUploadSignedUrl extends EventObject {
    objectKey: string,
    method: SignedURLMethod
}
