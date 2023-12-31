import mongoose from "mongoose";

const task = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: [
            'none',
            'ongoing',
            'completed'
        ],
        default: 'none',
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