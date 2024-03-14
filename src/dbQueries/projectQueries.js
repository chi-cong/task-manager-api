const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProject = async (project, managerId) => {
  let newProject;
  try {
    newProject = await prisma.project.create({
      data: {
        name: project.name,
        manager: {
          connect: {
            id: managerId,
          },
        },
      },
    });
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code };
    }
    return { errorCode: e };
  }
  return newProject;
};

const getProjectById = async (id) => {
  let project;
  try {
    project = await prisma.project.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code };
    }
    return { errorCode: e };
  }
  return project;
};

const getAllProjects = async () => {
  let projects = [];
  try {
    projects = await prisma.project.findMany();
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code };
    }
    return { errorCode: e };
  }
  return projects;
};

const addProjectTask = async (projectId, task) => {
  let project;
  try {
    project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        tasks: {
          connectOrCreate: {
            create: {
              ...task,
            },
            where: {
              id: task.id,
            },
          },
        },
      },
    });
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code };
    }
    return { errorCode: e };
  }
  return project;
};

const addProjectUser = async (projectId, user) => {
  let project;
  try {
    project = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        users: {
          connect: {
            username: user.username,
          },
        },
      },
    });
  } catch (e) {
    if (e.code) {
      return { errorCode: e.code };
    }
    return { errorCode: e };
  }
  return project;
};
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  addProjectTask,
  addProjectUser,
};
