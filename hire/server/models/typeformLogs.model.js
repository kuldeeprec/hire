const mongoose = require("mongoose");
const { con_prograd_recruit } = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const TypeformSchema = new Schema(
    {
        role_id: {
            type: String,
            required: true
        },
        o_id: {
            type: String,
            required: true
        },
        batch_id: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        recording: {
            type: String,
            required: true
        },
        remarks: {
            type: String,
            required: true
        },
        created_at: {
            type: Number,
            required: true
        },
        updated_at: {
            type: Number,
            required: true
        }
    },
    { versionKey: false }
);

module.exports = TypeformLogs = con_prograd_recruit.model("typeform_logs", TypeformSchema);