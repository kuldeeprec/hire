const mongoose = require("mongoose");
const { con_prograd_recruit } = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const NotesSchema = new Schema(
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
        round: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        remarks: {
            type: String,
            required: true
        },
        updated_by: {
            type: Number,
            required: true
        },
        remarker_name: {
            type: String,
            required: true
        },
        score: {
            type: Number,
            required: true
        }
    },
    { versionKey: false }
);

module.exports = Notes = con_prograd_recruit.model("notes", NotesSchema);