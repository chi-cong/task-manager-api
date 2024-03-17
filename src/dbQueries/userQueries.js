const { PrismaClient } = require("@prisma/client");
const { queryErrMap } = require("../utils/maps/queryErrMap");
const { getUserRoleByName } = require("./userRoleQueries");

const prisma = new PrismaClient();
let getAllUsersCursor = 0;

const createUser = async ({ username, password, salt, creator }) => {
  let user;
  try {
    user = await prisma.user.create({
      data: {
        username: username,
        password: password,
        salt: salt,
        creator: creator ? { connect: { id: creator } } : undefined,
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
const findUserById = async (id) => {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: {
        id,
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
      select: {
        username: true,
        tasks: true,
        userTask: true,
        project: true,
        role: true,
        creator: true,
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

const addUserLargeTask = ({ username, taskId }) => {
  let user;
  try {
    user = prisma.user.update({
      where: {
        username,
      },
      data: {
        tasks: {
          connect: {
            id: taskId,
          },
        },
      },
    });
  } catch (e) {
    return queryErrMap(e);
  }
  return user;
};
const addUserTask = ({ username, userTaskId }) => {
  let user;
  try {
    user = prisma.user.update({
      where: {
        username,
      },
      data: {
        userTask: {
          connect: {
            id: userTaskId,
          },
        },
      },
    });
  } catch (e) {
    return queryErrMap(e);
  }
  return user;
};

const addUserProject = ({ username, projectId }) => {
  let user;
  try {
    user = prisma.user.update({
      where: {
        username,
      },
      data: {
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  } catch (e) {
    return queryErrMap(e);
  }
  return user;
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
  findUserById,
  getAllUsers,

  updateUserGeneral,
  updateUserPassword,
  addUserTask,
  addUserLargeTask,
  addUserProject,

  deleteUserByName,
};
