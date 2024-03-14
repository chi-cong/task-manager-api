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

module.exports = { createNewUserRole };
