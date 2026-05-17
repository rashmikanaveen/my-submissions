const connectDB = require('./db')
const config = require('./utils/config')
const app = require('./app')
const logger = require('./utils/logger')

const startServer = async () => {
  try {
    await connectDB()

    const PORT = config.PORT || 3001
    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error.message)
    process.exit(1)
  }
}

startServer()

