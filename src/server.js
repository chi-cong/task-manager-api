const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerUi = require("swagger-ui-express"),
  swaggerDoc = require("./docs/swagger/ApiDoc.json");
require("dotenv").config();
const app = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { explorer: true })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//routes
app.use("/user", require("./routes/userRouter.js"));
// app.use("/project", require("./routes/projectRouter.js"));
app.use("/user-role", require("./routes/userRoleRouter.js"));
app.use("/permis", require("./routes/permissionRoute"));

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);
