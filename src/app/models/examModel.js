const mongoose = require("mongoose");
const mongoose_delete = require("mongoose-delete");
//
const ExamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);
//
ExamSchema.plugin(mongoose_delete, { deletedAt: true }); //Plugin to soft delete documents
//
module.exports = mongoose.model("Exam", ExamSchema);