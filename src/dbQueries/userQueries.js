const { PrismaClient } = require("@prisma/client");
const { queryErrMap } = require("../utils/maps/queryErrMap");

const prisma = new PrismaClient();
let getAllUsersCursor = 0;

const createUser = async ({ username, password, salt, role, creator }) => {
  let user;
  try {
    user = await prisma.user.create({
      data: {
        username,
        password,
        salt,
        role: role ? { connect: { name: role } } : null,
        creator: creator ? { connect: { username: creator } } : null,
      },
    });
  } catch (e) {
    return queryErrMap(e);
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
    return queryErrMap(e);
  }
  return user;
};

const getAllUsers = async () => {
  let allUsers;
  try {
    allUsers = await prisma.user.findMany({
      take: 10,
      skip: 1,
      cursor: {
        id: getAllUsersCursor,
      },
    });
    getAllUsersCursor = allUsers[9].id;
  } catch (e) {
    return queryErrMap(e);
  }
  return allUsers;
};

const updateUserGeneral = async ({ username, role }) => {
  let updatedUser;
  try {
    updatedUser = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        role: { connect: { name: role } },
      },
    });
  } catch (e) {
    return queryErrMap(e);
  }
  return updatedUser;
};

const updateUserPassword = async ({ username, password }) => {
  let updatedUser;
  try {
    updatedUser = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        password,
      },
    });
  } catch (e) {
    return queryErrMap(e);
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
    return queryErrMap(e);
  }
  return deletedUser;
};

module.exports = {
  createUser,
  findUserByName,
  updateUserGeneral,
  deleteUserByName,
  updateUserPassword,
  getAllUsers,
};
