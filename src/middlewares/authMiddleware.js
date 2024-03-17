const { decryptToken } = require("../utils/security/tokenHandler");
const { findUserById } = require("../dbQueries/userQueries");
const { checkPermission } = require("../dbQueries/permissonQueries");

module.exports = async (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken) {
    return res
      .status(401)
      .json({ flag: false, data: {}, message: "unauthorized request" });
  }

  let data;
  try {
    data = decryptToken(authToken);
  } catch {
    return res
      .status(401)
      .json({ flag: false, data: {}, message: "unauthorized request" });
  }

  const user = await findUserById(data.id);
  if (!user) {
    return await res
      .status(401)
      .json({ flag: false, data: {}, message: "user not founded" });
  }

  const exp = data.exp;
  if (Math.floor(Date.now() / 1000) - exp > 0) {
    return res
      .status(401)
      .json({ flag: false, data: {}, message: "token expired" });
  }

  const queryRoute = req.baseUrl + req.path;
  const permisResult = await checkPermission({
    route: queryRoute,
    group: user.roleId,
  });

  if (!permisResult) {
    return await res.status(401).json({
      flag: false,
      data: {},
      message:
        "You don't have permission to access this resource. Contact users in charge",
    });
  }

  res.locals.authId = user.id;
  next();
};
