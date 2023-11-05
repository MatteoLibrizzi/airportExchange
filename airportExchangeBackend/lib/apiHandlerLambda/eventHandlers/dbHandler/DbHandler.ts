
export interface LeaveObjectDbInput {
    name: string,
    description: string,
    location: string,
    randomNumber: number,
    imageS3Key: string,
}
export class DbHandler {

    static leaveObject = ({name, description, location, randomNumber, imageS3Key}: LeaveObjectDbInput) => {
        // TODO implement database interaction
    }
}