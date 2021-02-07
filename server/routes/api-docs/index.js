const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// Setup Swagger api docs
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "FileSend API",
      version: "1.0.0",
      description: "Filesend API made with Restana",
      license: {
        name: "Licensed Under MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Justin Taylor",
        url: "https://sjustintaylor.com.au",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
  },

  // Paths to files containing OpenAPI definitions
  apis: ["./routes/*.js"],
});

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.get("/", swaggerUi.setup(swaggerSpec));

module.exports = router;
