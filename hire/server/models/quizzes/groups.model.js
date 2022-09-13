const mongoose = require("mongoose");
const { con_quizr_platform } = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const GroupSchema = new Schema(
    {
        o_id: {
            type: String,
            required: true
        },
        group_id: {
            type: Number,
            required: true
        },
        group_name: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true
        },
        group_type: {
            type: Number,
            required: true
        },
        perm_type: {
            type: Number,
            required: true
        }
    },
    { versionKey: false }
)

module.exports = Groups = con_quizr_platform.model("ogn_groups", GroupSchema)