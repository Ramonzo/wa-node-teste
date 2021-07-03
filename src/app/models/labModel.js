const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
//
const LabSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        exams: {
            type: Array,
            of: mongoose.Schema.Types.ObjectId,
            ref: 'Exam',
            default: []
        }
    },
    {
        timestamps: true
    }
);
//
LabSchema.plugin(mongoose_delete, { deletedAt: true }); //Plugin to soft delete documents
//
module.exports = mongoose.model("Lab", LabSchema);