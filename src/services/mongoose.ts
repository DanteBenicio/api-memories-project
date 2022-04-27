import mongoose from "mongoose"

export async function connectToMongoDB(uri: string) {
  try {
    const response = await mongoose.connect(uri)
    
    if (response) return 200
  } catch (error) {
    return error
  }
}
