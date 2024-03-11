const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { findManagerById } = require("../dbQueries/managerQueries");
const {
  addProjectTask,
  createProject,
  getProjectById,
  getAllProjects,
  addProjectUser,
} = require("../dbQueries/projectQueries");

const projectRouter = express.Router();

projectRouter.post("/create", [authMiddleware], async (req, res) => {
  const managerId = res.locals.authId;
  const payload = req.body;
  const manager = await findManagerById(managerId);
  if (!manager) {
    return await res
      .status(404)
      .json({ flag: false, data: {}, message: "Incorrect manager token" });
  }
  const project = await createProject(payload, managerId);
  if (!project) {
    return await res
      .status(500)
      .json({ flag: false, data: {}, message: `Failed!  Unknown error` });
  }
  if (await project.errorCode) {
    return await res.status(400).json({
      flag: false,
      data: {},
      message: `Failed! error: ${project.errorCode}`,
    });
  }
  return await res.status(201).json({
    flag: true,
    data: { project },
    message: "New project is created !",
  });
});

projectRouter.get("/get-all", [authMiddleware], async (req, res) => {
  const projects = await getAllProjects();
  if (!projects) {
    return await res
      .status(500)
      .json({ flag: false, data: {}, message: `Failed!  Unknown error` });
  }
  if (await projects.errorCode) {
    return res.status(400).json({
      flag: false,
      data: {},
      message: `Failed! error: ${projects.errorCode}`,
    });
  }

  return await res
    .status(200)
    .json({ flag: true, data: { projects }, message: "All projects here" });
});

projectRouter.get("/get/:projectId", [authMiddleware], async (req, res) => {
  const projectId = req.params.projectId;
  if (!projectId) {
    return await res
      .status(400)
      .json({ flag: false, data: {}, message: "Missing project ID" });
  }

  const project = await getProjectById(projectId);
  if (!project) {
    return await res
      .status(500)
      .json({ flag: false, data: {}, message: `Failed!  Unknown error` });
  }
  if (await project.errorCode) {
    return await res.status(400).json({
      flag: false,
      data: {},
      message: `Failed! error: ${project.errorCode}`,
    });
  }

  return await res.status(200).json({
    flag: true,
    data: { project },
    message: `Project with id : ${projectId}`,
  });
});

projectRouter.post("/add-task", [authMiddleware], async (req, res) => {
  const { projectId, task } = req.body;
  if (!projectId) {
    return await res
      .status(400)
      .json({ flag: false, data: {}, message: "Missing project ID" });
  }

  const result = await addProjectTask(projectId, task);
  if (!result) {
    return await res
      .status(500)
      .json({ flag: false, data: {}, message: `Failed!  Unknown error` });
  }
  if (result.errorCode) {
    return await res.status(400).json({
      flag: false,
      data: {},
      message: `Failed! error: ${result.errorCode}`,
    });
  }

  return await res
    .status(200)
    .json({ flag: true, data: {}, message: `Task was added to project` });
});

projectRouter.post("/add-task", [authMiddleware], async (req, res) => {
  const { projectId, username } = req.body;
  if (!projectId) {
    return await res
      .status(400)
      .json({ flag: false, data: {}, message: "Missing project ID" });
  }

  const result = await addProjectTask(projectId, username);
  if (!result) {
    return await res
      .status(500)
      .json({ flag: false, data: {}, message: `Failed!  Unknown error` });
  }
  if (result.errorCode) {
    return await res.status(400).json({
      flag: false,
      data: {},
      message: `Failed! error: ${result.errorCode}`,
    });
  }

  return await res
    .status(200)
    .json({ flag: true, data: {}, message: `Task was added to project` });
});

module.exports = projectRouter;
