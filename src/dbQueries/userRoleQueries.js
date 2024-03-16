const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { queryErrMap } = require("../utils/maps/queryErrMap");

const createNewUserRole = (newRoleData) => {
  let newRole;
  try {
    newRole = prisma.userRole.create({
      data: {
        ...newRoleData,
      },
    });
  } catch (e) {
    return queryErrMap(e);
  }
  return newRole;
};

const getUserRoleByName = (name) => {
  let role;
  try {
    role = prisma.userRole.findUnique({
      where: {
        name: name,
      },
    });
  } catch (e) {
    return queryErrMap(e);
  }
  return role;
};

module.exports = { createNewUserRole, getUserRoleByName };
