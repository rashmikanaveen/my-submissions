const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  const url = process.env.MONGODB_URI

  if (!url) {
    throw new Error('MONGODB_URI is not defined in the .env file')
  }

  mongoose.set('strictQuery', false)

  await mongoose.connect(url)
  console.log('connected to MongoDB')
}

module.exports = connectDB