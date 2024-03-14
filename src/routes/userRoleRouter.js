const express = require("express");
const { createNewUserRole } = require("../dbQueries/userRoleQueries");
const { resMap } = require("../utils/maps/responseMap");

const userRoleRouter = express.Router();

userRoleRouter.post("/create-role", async (req, res) => {
  const payload = req.body;
  const createdUser = await createNewUserRole(payload);
  return await resMap({
    res,
    data: createdUser,
    successMessage: "New role was added",
    isReturnData: false,
  });
});

module.exports = userRoleRouter;
