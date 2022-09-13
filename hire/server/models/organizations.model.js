const mongoose = require("mongoose");
const { con_prograd_recruit } = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const OrganizationsSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        status: {
            type: Number,
            required: true
        },
        domain: {
            type: String,
            required: true
        },
        last_modified: {
            type: Number,
            required: true
        },
        invitees: {
            type: Array,
            required: true,
            default: []
        }
    },
    { versionKey: false }
);

module.exports = Organizations = con_prograd_recruit.model("organizations", OrganizationsSchema);