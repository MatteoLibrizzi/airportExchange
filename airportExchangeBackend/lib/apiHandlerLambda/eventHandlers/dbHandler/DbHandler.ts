
export interface LeaveObjectDbInput {
    name: string,
    description: string,
    location: string,
    imageS3Key: string,
}
export class DbHandler {

    static leaveObject = ({name, description, location, imageS3Key}: LeaveObjectDbInput) => {
        // TODO implement database interaction
    }

    static getCurrentIndex = () => {
        // current index can be stored in the item at pk = 0, if this is not present then it means table is empty and we create the item, and return the value 0
        return 0
    }

    static incrementCurrentIndex = () => {
        
    }
}