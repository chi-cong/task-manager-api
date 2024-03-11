const express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

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
  },
  apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecs, { explorer: true })
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

//routes
app.use("/user", require("./routes/userRouter.js"));
app.use("/manager", require("./routes/managerRouter.js"));
app.use("/project", require("./routes/projectRouter.js"));

const PORT = process.env.PORT || 3000;
app.listen(PORT);

console.debug("Server listening on port: " + PORT);
