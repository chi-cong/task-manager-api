const express = require("express")
const { createManager, findManagerByName, updateManager } = require("../dbQueries/managerQueries")
const { generateToken } = require("../utils/tokenHandler")
const authMiddleware = require("../middlewares/authMiddleware")

const managerRouter = express.Router()

managerRouter.post("/sign-up", [], async (req, res) => {
  const { managerName, password } = req.body
  const manager = await createManager(managerName, password)

  if (!manager) {
    return res.status(500).json({ flag: false, data: {}, message: "Failed! Unknown error" })
  }

  // common errors
  if (await manager.errorCode === "P2002") {
    return await res.status(400).json({ flag: false, data: {}, message: "Existed managerName" })
  }

  // uncommon errors
  if (await manager.errorCode) {
    return await res.status(400).json({ flag: false, data: {}, message: `Failed! Error : ${manager.errorCode}` })
  }

  return await res.status(201).json({ flag: true, data: {}, message: "New manager added" })
})

managerRouter.post("/login", [], async (req, res) => {
  const { managername, password } = req.body
  const manager = await findManagerByName(managername)

  // common errors
  if (!manager) {
    return await res.status(404).json({ flag: false, data: {}, message: "Manager was not found" })
  }
  if (await manager.password && manager.password !== password) {
    return await res.status(400).json({ flag: false, data: {}, message: "Incorrect password" })
  }

  // uncommon errors
  if (await manager.errorCode) {
    return res.status(500).json({ flag: false, data: {}, message: `Failed! Error : ${manager.errorCode}` })
  }

  return await res.status(200).json({ flag: true, data: { tokenData: generateToken({ id: manager.id }) }, message: "Successful login" })
})

managerRouter.post("/update", [authMiddleware], async (req, res) => {
  const updatedManager = req.body
  const manager = await findManagerByName(updatedManager.managername)

  if (await manager.id !== res.locals.authId) {
    return await res.status(403).json({ flag: false, data: {}, message: "Incorrect manager id" })
  }

  const updateResult = await updateManager(updatedManager)

  if (await updateResult.errorCode) {
    return await res.status(500).json({ flag: false, data: {}, message: `Failed! Error : ${updateResult.errorCode}` })
  }

  return await res.status(200).json({ flag: true, data: {}, message: "Manager is updated !" })
})

module.exports = managerRouter