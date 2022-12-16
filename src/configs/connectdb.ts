import mongoose from 'mongoose';
import colors from 'colors';
import logEvents from '../helpers/logEvents';
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {
    try {
        // mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(colors.green('Connect MongoDB successfully!!'));
    } catch (error: any) {
        console.log(error);
        await logEvents(error.message, module.filename);
        console.error(colors.red('Connect MongoDB failed!!'));
        process.exit(1);
    }
};
process.on('SIGINT', async () => {
    console.log(colors.red('You are performing a server shutdown!'));
    await mongoose.connection.close();
    process.exit(0);
});
export default connectDB;
