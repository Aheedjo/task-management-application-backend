import mongoose from "mongoose";

const label = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

label.set("toJSON", {
    transform: function (doc, ret, options) {
      ret.id = ret._id;
  
      delete ret._id;
      delete ret.__v;
    },
});

const labelSchema = mongoose.model("Label", label);
export default labelSchema;