const mongoose = require("mongoose");
const { con_prograd_recruit } = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const BatchSchema = new Schema(
    {
        batch_id: {
            type: String,
            required: true
        },
        role_id: {
            type: String,
            required: true
        },
        o_id: {
            type: String,
            required: true
        },
        rounds: {
            type: Array,
            required: true
        },
        status: {
            type: Number,
            required: true
        }
    },
    { versionKey: false }
);

module.exports = Batches = con_prograd_recruit.model("batches", BatchSchema);