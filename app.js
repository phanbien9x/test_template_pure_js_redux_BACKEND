import express, { json, urlencoded } from 'express';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import connectDatabase from './src/config/db.config.js';
import todoRouter from './src/routes/todoRouter.js';
if (process.env.NODE_ENV !== 'production') config();
connectDatabase();

const port = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vietedu API',
      version: '1.0.0',
      description: 'A simple API',
    },
    servers: [
      {
        url: 'http://localhost:5000/api',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();
app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/todo', todoRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
