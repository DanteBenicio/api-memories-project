import mongoose from "mongoose"

export async function connectToMongoDB(uri: string) {
  try {
    const response = await mongoose.connect(uri)
    
    return response
  } catch (error) {
    return error
  }
}
