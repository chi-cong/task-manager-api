const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { queryErrMap } = require("../utils/maps/queryErrMap");

const createPermission = async ({ route, roleGroupIds }) => {
  let permission;
  try {
    permission = await prisma.permission.create({
      data: {
        route,
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

const updatePermission = async ({ route, roleGroupIds }) => {
  let permission;
  try {
    permission = await prisma.permission.update({
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
const checkPermission = async ({ route, group }) => {
  let permission;
  try {
    permission = await prisma.permission.findUnique({
      where: {
        route: route,
      },
      include: {
        role: {
          where: {
            id: group,
          },
        },
      },
    });
  } catch (e) {
    return queryErrMap(e);
  }
  return permission;
};

module.exports = { createPermission, updatePermission, checkPermission };
