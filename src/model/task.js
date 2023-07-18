import mongoose from "mongoose";

const task = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label',
        required: true
    },
    bucketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
    },
    labels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Label'
    }],
});

task.set("toJSON", {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
        
      delete ret._id;
      delete ret.__v;
    },
});

const taskSchema = mongoose.model("Task", task); 
export default taskSchema;