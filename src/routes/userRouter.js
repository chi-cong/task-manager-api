const express = require("express");
const {
  createUser,
  findUserByName,
  updateUserGeneral,
} = require("../dbQueries/userQueries");
const { generateToken } = require("../utils/security/tokenHandler");
const { resMap } = require("../utils/maps/responseMap");
const {
  generateSalt,
  hashPassword,
  verifyPassword,
} = require("../utils/security/messageCrypto");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.post("/create-user", [authMiddleware], async (req, res) => {
  const creator = res.locals.authId;
  const { username, password, role } = req.body;
  const salt = generateSalt();
  const hashedPassword = hashPassword(password, salt);
  const user = await createUser({
    username,
    password: hashedPassword,
    salt,
    role,
    creator,
  });

  return await resMap({
    res,
    data: user,
    successMessage: "New user created.",
    returnData: {},
  });
});

userRouter.post("/login", [], async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByName(username);

  const checkPassword = async () => {
    if (!verifyPassword(user.password, password, user.salt)) {
      return await res
        .status(400)
        .json({ flag: false, data: {}, message: "Incorrect password" });
    }
  };

  return await resMap({
    res,
    data: user,
    successMessage: "",
    returnData: generateToken({ id: user.id ? user.id : "" }),
    callback: checkPassword,
  });
});

userRouter.post("/update", [authMiddleware], async (req, res) => {
  const updatedUser = req.body;
  const user = await findUserByName(updatedUser.username);

  if ((await user.id) !== res.locals.authId) {
    return await res
      .status(403)
      .json({ flag: false, data: {}, message: "Incorrect user id" });
  }

  const updateResult = await updateUserGeneral(updatedUser);

  return resMap({
    res,
    data: updateResult,
    returnData: {},
    successMessage: "User is updated",
  });
});

module.exports = userRouter;
