/**
 * @swagger
 * components:
 * tags:
 *  name: Users
 *  description: Apis for user
 * /sign-up:
 *  post:
 *    summary: create user account
 *    tags: [Users]
 *    response:
 *      201:
 *        description: successful create new user
 *        content:
 *          application/json
 *            schema:
 *            type: object
 *            properties:
 *              type: object
 *              properties:
 *                flag:
 *                  type: bool
 *                  description: success request or not
 *                  example: true
 *                data:
 *                  type: object
 *                  description: returned data
 *                message:
 *                  type: string
 *                  description: usually response error details
 **/
const express = require("express");
const {
  createUser,
  findUserByName,
  updateUser,
} = require("../dbQueries/userQueries");
const { generateToken } = require("../utils/tokenHandler");
const authMiddleware = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.post("/sign-up", [], async (req, res) => {
  const { username, password } = req.body;
  const user = await createUser(username, password);

  if (!user) {
    return res
      .status(500)
      .json({ flag: false, data: { user }, message: "Failed! Unknown error" });
  }

  // common errors
  if ((await user.errorCode) === "P2002") {
    return await res
      .status(400)
      .json({ flag: false, data: {}, message: "Existed username" });
  }

  // uncommon errors
  if (await user.errorCode) {
    return await res.status(400).json({
      flag: false,
      data: {},
      message: `Failed! Error : ${user.errorCode}`,
    });
  }

  return await res
    .status(201)
    .json({ flag: true, data: { ...user }, message: "New user added" });
});

userRouter.post("/login", [], async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByName(username);

  // common errors
  if (!user) {
    return await res
      .status(404)
      .json({ flag: false, data: {}, message: "User was not found" });
  }
  if ((await user.password) !== password) {
    return await res
      .status(400)
      .json({ flag: false, data: {}, message: "Incorrect password" });
  }

  // uncommon errors
  if (await user.errorCode) {
    return res.status(500).json({
      flag: false,
      data: {},
      message: `Failed! Error : ${user.errorCode}`,
    });
  }

  return await res.status(200).json({
    flag: true,
    data: { tokenData: generateToken({ id: user.id }) },
    message: "Successful login",
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

  const updateResult = await updateUser(updatedUser);

  if (await updateResult.errorCode) {
    return await res.status(500).json({
      flag: false,
      data: {},
      message: `Failed! Error : ${updateResult.errorCode}`,
    });
  }

  return await res
    .status(200)
    .json({ flag: true, data: {}, message: "User is updated !" });
});

module.exports = userRouter;
