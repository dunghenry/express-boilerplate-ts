import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import colors from 'colors';
import bodyParser from 'body-parser';
import winston from 'winston';
import expressWinston from 'express-winston';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import {
    MongoDBTransportInstance,
    MongoDBConnectionOptions,
} from 'winston-mongodb';

import connectDB from './configs/connectdb';
import openapiSpecification from './helpers/docs.api';
import { logger, myFormat } from './helpers/logger';
dotenv.config();
const port: string | number = process.env.PORT || 4000;
export const app: Express = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

// logger
const {
    MongoDB,
}: { MongoDB: MongoDBTransportInstance } = require('winston-mongodb');
const mongoTransport = new MongoDB({
    db: process.env.MONGODB_URI as string,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    collection: 'logs',
} as MongoDBConnectionOptions);
app.use(
    expressWinston.logger({
        transports: [mongoTransport],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.metadata(),
            winston.format.prettyPrint(),
        ),
        // winstonInstance: logger,
        statusLevels: true,
    }),
);
app.use(
    expressWinston.errorLogger({
        transports: [
            new winston.transports.File({
                filename: 'src/logs/logsInternalErrors.log',
            }),
        ],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.timestamp(),
            winston.format.metadata(),
            winston.format.prettyPrint(),
            myFormat,
        ),
    }),
);
// console.log(process.env.MONGODB_URI);
connectDB();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
routes(app);
app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ message: 'Hello World!' });
});
app.listen(port, () =>
    console.log(colors.green(`Server listening on http://localhost:${port}`)),
);
