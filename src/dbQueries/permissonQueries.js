const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { queryErrMap } = require("../utils/maps/queryErrMap");

const createPermission = ({ route, initRoleGroupIds }) => {
  let permission;
  try {
    permission = prisma.permission.create({
      data: {
        route,
        role: {
          connect: [...initRoleGroupIds],
        },
      },
    });
  } catch (e) {
    return queryErrMap(e);
  }
  return permission;
};

const updatePermission = ({ route, roleGroupIds }) => {
  let permission;
  try {
    permission = prisma.permission.update({
      where: {
        route,
      },
      data: {
        role: {
          connect: [...roleGroupIds],
        },
      },
    });
  } catch (e) {
    return queryErrMap(e);
  }
  return permission;
};

module.exports = { createPermission, updatePermission };
