import { v4 as uuid } from 'uuid'

export const generateRandomFilename = (filename: string) => {
  return uuid() + filename
}
