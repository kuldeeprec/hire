const mongoose = require("mongoose");
const { con_quizr_platform } = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const AssignmentSchema = new Schema(
    {
        instance_id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        test_id: {
            type: String,
            required: true
        },
        groups: {
            type: Array,
            required: true
        },
        users: {
            type: Array,
            required: true
        },
        uid: {
            type: Number,
            required: true
        },
        time: { 
            type: Number,
            required: true
        },
        ip: {
            type: String,
            required: true
        },
        o_id: {
            type: String,
            required: true
        }
    },
    { versionKey: false }
)

module.exports = Assignments = con_quizr_platform.model(
    'ogn_assignments', AssignmentSchema
);