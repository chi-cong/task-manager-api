const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerUi = require("swagger-ui-express"),
  swaggerDoc = require("./docs/swagger/ApiDoc.json");
require("dotenv").config();
const app = express();

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Task Manager API",
      version: "0.1.0",
      description: "RESTful API For Task Manager App",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [`./src/routes/userRouter.js`],
};

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

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);
