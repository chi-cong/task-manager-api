const { decryptToken } = require("../utils/tokenHandler")

module.exports = (req, res, next) => {
  const authToken = req.headers.bearer
  if (!authToken) {
    return res.status(401).json({ flag: false, data: {}, message: "unauthorized request" })
  }

  const data = decryptToken(authToken)
  const userId = data.id;
  if (!userId) {
    return res.status(401).json({ flag: false, data: {}, message: "user not founded" })
  }

  const exp = data.exp
  if ((Math.floor(Date.now() / 1000) - exp) > 0) {
    return res.status(401).json({ flag: false, data: {}, message: "token expired" })
  }

  res.locals.authId = userId
  next()
}