const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const connectDB = async () => {
  const url = config.MONGODB_URI

  if (!url) {
    logger.error('MONGODB_URI is not defined in the .env file')
    process.exit(1)
  }

  mongoose.set('strictQuery', false)

  try {
    await mongoose.connect(url, { family: 4 })
    logger.info('connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message)
    // Force the Node.js process to exit if the database connection fails
    process.exit(1)
  }
}

module.exports = connectDB