const { PrismaClient, Prisma } = require("@prisma/client")

const prisma = new PrismaClient()

const createMananger = async (manangerName, password) => {
  let mananger;
  try {
    mananger = await prisma.mananger.create({
      data: {
        manangerName,
        password,
        role: "",
        projects: {},
        tasks: {}
      }
    })
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code }
    }
    return { errorCode: e }
  }
  return mananger
}

const findManangerByName = async (manangerName) => {
  let mananger;
  try {
    mananger = await prisma.mananger.findUnique({
      where: {
        manangerName
      }
    })
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code }
    }
    return { errorCode: e }
  }
  return mananger
}

const updateMananger = async (newMananger) => {
  let updatedMananger
  try {
    updateMananger = await prisma.mananger.update({
      where: {
        manangerName: newMananger.manangerName
      },
      data: {
        role: newMananger.role,
        password: newMananger.password,
        projects: newMananger.project,
        tasks: newMananger.task,
      }
    })
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code }
    }
    return { errorCode: e }
  }

  return updatedMananger
}

module.exports = { createMananger, findManangerByName, updateMananger }