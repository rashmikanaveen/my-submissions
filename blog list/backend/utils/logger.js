const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params)
}


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

module.exports = { info, error,requestLogger }