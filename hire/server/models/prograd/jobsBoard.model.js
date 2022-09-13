const mongoose = require("mongoose");
const {con_prograd} = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const jobsBoardSchema = new Schema(
    {
        program: {
            type: String,
            required: true
        },
        gist: {
            type: String,
            required: true
        },
        logo: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        hero_content: {
            type: Object,
            required: true
        },
        program_overview: {
            type: Object,
            required: true
        },
        eligibility_criteria: {
            type: Array,
            required: true
        },
        company_info: {
            type: Object,
            required: true
        },
        banner: {
            type: Object,
            required: true
        },
        o_id: {
            type: String,
            required: true
        },
        role_id: {
            type: String,
            required: true
        },
        batch_id: {
            type: String,
            required: true
        },
        application_status: {
            type: Number,
            required: true
        },
        status: {
            type: Number,
            required: true
        }
    },
    { versionKey: false }
);

const JobsBoard = con_prograd.model("jobs_board", jobsBoardSchema);

module.exports = JobsBoard;