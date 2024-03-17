const express = require("express");
const { createPermission } = require("../dbQueries/permissonQueries");
const { resMap } = require("../utils/maps/responseMap");
const authMiddleware = require("../middlewares/authMiddleware");

const permisRouter = express.Router();

permisRouter.post("/create-permis", [], async (req, res) => {
  const { route, roleGroupIds } = req.body;
  const permis = await createPermission({ route, roleGroupIds });
  return await resMap({
    res,
    data: permis,
    returnData: {},
    successMessage: "New route permission is added",
  });
});

module.exports = permisRouter;
