const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const createManager = async (managerName, password) => {
  let manager;
  try {
    manager = await prisma.manager.create({
      data: {
        managername: managerName,
        password,
        role: "",
        projects: {}
      }
    })
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code }
    }
    return { errorCode: e }
  }
  return manager
}

const findManagerByName = async (managerName) => {
  let manager;
  try {
    manager = await prisma.manager.findUnique({
      where: {
        managername: managerName
      }
    })
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code }
    }
    return { errorCode: e }
  }
  return manager
}
const findManagerById = async (id) => {
  let manager;
  try {
    manager = await prisma.manager.findUnique({
      where: {
        id
      }
    })
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code }
    }
    return { errorCode: e }
  }
  return manager
}

const updateManager = async (newManager) => {
  let updatedManager
  try {
    updatedManager = await prisma.manager.update({
      where: {
        managername: newManager.managername
      },
      data: {
        role: newManager.role,
        password: newManager.password,
        projects: newManager.project,
        tasks: newManager.task,
      }
    })
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code }
    }
    return { errorCode: e }
  }

  return updatedManager
}

module.exports = { createManager, findManagerByName, findManagerById, updateManager }