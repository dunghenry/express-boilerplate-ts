import { Response, Request } from 'express';
import User from '../models/User';
class userController {
    static async getUsers(req: Request, res: Response) {
        const users = await User.find();
        return res.status(200).json(users);
    }
}

export default userController;
