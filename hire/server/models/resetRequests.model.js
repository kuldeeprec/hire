const mongoose = require("mongoose");
const { con_prograd_recruit } = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const resetRequestSchema = new Schema(
    {
        uid: {
            type: Number,
            required: true
        },
        vcode: {
            type: String,
            required: true
        },
        vcode_expiry: {
            type: Number,
            required: true
        },
        requested_at: {
            type: Number,
            required: true
        },
        request_count: {
            type: Number,
            required: true
        },
        ip: {
            type: String,
            required: true
        }
    },
    { versionKey: false }
);

module.exports = ResetRequests = con_prograd_recruit.model("user_reset_requests", 
resetRequestSchema);