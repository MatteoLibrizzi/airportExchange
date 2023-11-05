import { FILE_SIZE_LIMIT } from "../constants"

export const isFileSizeTooBig = (fileSize: number) => {
    return fileSize > FILE_SIZE_LIMIT
}

export const generateImageS3Key = (name: string, id: number) => {

}