import { Express } from 'express';
import user from './user.route';
const routes = (app: Express) => {
    app.use('/users', user);
};

export default routes;
