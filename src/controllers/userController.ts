import { Response, Request } from 'express';
import User from '../models/User';
class userController {
    static async getUsers(req: Request, res: Response) {
        try {
            const users = await User.find();
            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}

export default userController;
