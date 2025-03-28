import express from "express";
import "express-async-errors";
import cookieSession from "cookie-session";
import cors from "cors";
import dotenv from "dotenv";
import { currentUser, errorHandler, NotFoundError } from "@bhtickix/common";

import authRouter from "./routes/auth.route.js";
import usersRouter from "./routes/users.route.js";
import subjectsRouter from "./routes/subjects.route.js";
import topicsRouter from "./routes/topics.route.js";
import subtopicsRouter from "./routes/subtopics.route.js";
import modulesRouter from "./routes/modules.route.js";
import conceptsRouter from "./routes/concepts.route.js";
import formulasRouter from "./routes/formulas.route.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


dotenv.config();
const app = express();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'BH Tickix API Documentation',
    version: '1.0.0',
    description: 'API documentation for the BH Tickix application',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'session'
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'User ID'
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Error message'
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                message: {
                  type: 'string'
                },
                field: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    },
    responses: {
      UnauthorizedError: {
        description: 'Authentication is required',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      },
      BadRequestError: {
        description: 'Invalid input',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error'
            }
          }
        }
      }
    }
  },
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints'
    },
    {
      name: 'Users',
      description: 'User management endpoints'
    },
    {
      name: 'Subjects',
      description: 'Subject management endpoints'
    },
    {
      name: 'Topics',
      description: 'Topic management endpoints'
    },
    {
      name: 'Subtopics',
      description: 'Subtopic management endpoints'
    },
    {
      name: 'Modules',
      description: 'Module management endpoints'
    },
    {
      name: 'Concepts',
      description: 'Concept management endpoints'
    },
    {
      name: 'Formulas',
      description: 'Formula management endpoints'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);



app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_BASE_URL],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.JWT_KEY],
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  })
);
app.use(currentUser);

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/subjects", subjectsRouter);
app.use("/topics", topicsRouter);
app.use("/subtopics", subtopicsRouter);
app.use("/modules", modulesRouter);
app.use("/concepts", conceptsRouter);
app.use("/formulas", formulasRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all("*", async () => {
  throw new NotFoundError("Route not found");
});
app.use(errorHandler);

export default app;
