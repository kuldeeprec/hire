const mongoose = require("mongoose");
const { con_quizr, con_quizr_platform } = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const GlobalAutoincrementSchema = new Schema(
    {
        field: {
            type: String
        },
        field_id: {
            type: String
        },
        nextId: {
            type: Number
        }
    },
    { versionKey: false }
)

const GlobalAutoincPlatformSchema = new Schema(
    {
        field_id: {
            type: String
        },
        nextId: {
            type: Number
        }
    },
    { versionKey: false }
)


const GlobalAutoincrement = con_quizr.model("global_autoincrement", 
GlobalAutoincrementSchema);
const GlobalAutoincPlatform = con_quizr_platform.model("global_autoincrement", 
GlobalAutoincPlatformSchema);

module.exports = {
    GlobalAutoincrement,
    GlobalAutoincPlatform
}