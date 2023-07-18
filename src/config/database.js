import mongoose from "mongoose";

let uri = 'mongodb+srv://admin:admin@taskmanagementcluster.z1oywsl.mongodb.net/?retryWrites=true&w=majority'

const connectDB = async () => {
    try {
        const con = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;