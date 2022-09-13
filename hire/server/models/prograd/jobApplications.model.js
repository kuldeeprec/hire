const mongoose = require("mongoose");
const {con_prograd} = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const JobApplicationsSchema = new Schema(
    {
        uid: {
            type: Number,
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
        email: {
            type: String,
            required: true 
        },
        batch_id: {
            type: String,
            required: true
        },
        applied_at: {
            type: Number,
            required: true
        },
        status: {
            type: Number,
            required: true,
            default: 1
        },
        assignment_status: {
            type: Number,
            required: true,
            default: 0
        }
    },
    { versionKey: false }
);

module.exports = JobApplicationsModel = con_prograd.model("job_applications", JobApplicationsSchema);
