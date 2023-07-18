import mongoose from "mongoose";

const bucket = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
});

const bucketSchema = mongoose.model("Bucket", bucket); 
export default bucketSchema;