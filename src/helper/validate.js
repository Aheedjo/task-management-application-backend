import mongoose from "mongoose";

export const idsAreValidObjectIds = (arr) => {
    return arr.every(id => mongoose.Types.ObjectId.isValid(id) && (new mongoose.Types.ObjectId(id)).toString() === id);
}

export const areIdsValid = (arr, Model) => {
    const existingLabels = Model.find({ _id: { $in: arr }});
    return (existingLabels.length === arr.length);
}