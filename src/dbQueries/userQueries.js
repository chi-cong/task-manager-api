const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createUser = async (username, password) => {
  let user;
  try {
    user = await prisma.user.create({
      data: {
        username,
        password,
        role: "",
        projects: {},
        tasks: {},
      },
    });
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code };
    }
    return { errorCode: e };
  }
  return user;
};

const findUserByName = async (username) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code };
    }
    return { errorCode: e };
  }
  return user;
};

const updateUser = async (newUser) => {
  let updatedUser;
  try {
    updatedUser = await prisma.user.update({
      where: {
        username: newUser.username,
      },
      data: {
        role: newUser.role,
        password: newUser.password,
        projects: newUser.project,
        tasks: newUser.task,
      },
    });
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code };
    }
    return { errorCode: e };
  }
  return updatedUser;
};

const deleteUserByName = async (username) => {
  let deletedUser;
  try {
    deletedUser = await prisma.user.delete({
      where: {
        username,
      },
    });
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code };
    }
    return { errorCode: e };
  }
  return deletedUser;
};

module.exports = { createUser, findUserByName, updateUser, deleteUserByName };
