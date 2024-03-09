const { PrismaClient, Prisma } = require("@prisma/client")

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
        managerName
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
    updateManager = await prisma.manager.update({
      where: {
        managerName: newManager.managerName
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

module.exports = { createManager, findManagerByName, updateManager }