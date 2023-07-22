import mongoose from "mongoose";

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    buckets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bucket'
    }],
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
});

const userSchema = mongoose.model("User", user);
export default userSchema;