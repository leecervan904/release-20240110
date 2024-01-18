/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
function transformResponse(req, res, next) {
  // transform response data


  next()
}

module.exports = transformResponse
