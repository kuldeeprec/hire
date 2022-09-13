const mongoose = require("mongoose");
const { con_quizr } = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const ReportSchema = new Schema(
    {
        instance_id: {
            type: String,
            required: true
        },
        uid: {
            type: Number,
            required: true
        },
        test_id: {
            type: String,
            required: true
        },
        test_type: {
            type: Number,
            required: true
        },
        test_name: {
            type: String,
            required: true
        },
        test_sections: {
            type: Object,
            required: true
        },
        question_log: {
            type: Object,
            required: true
        },
        action_log: {
            type: Object,
            required: true
        },
        settings: {
            type: Object,
            required: true
        },
        creation_time: {
            type: Number,
            required: true
        },
        last_update_time: {
            type: Number,
            required: true
        },
        question_wise_analysis: {
            type: Object,
            required: true
        },
        sectional_analysis: {
            type: Object,
            required: true
        },
        total_time_spent: {
            type: Number,
            required: true
        },
        avg_time_spent: {
            type: Number,
            required: true
        },
        total_score: {
            type: Number,
            required: true
        },
        total_possible_score: {
            type: Number,
            required: true
        },
        cuttoff: {
            type: Number,
            required: false
        },
        test_cutoff_passed: {
            type: Number,
            required: true
        },
        correct: {
            type: Number,
            required: true
        },
        incorrect: {
            type: Number,
            required: true
        },
        unanswered: {
            type: Number,
            required: true
        },
        partial_correct: {
            type: Number,
            required: true
        },
        accuracy: {
            type: Number,
            required: true
        },
        attempt: {
            type: Number,
            required: false
        },
        o_id: {
            type: String,
            required: false
        }
    },
    { versionKey: false }
);

const Reports = con_quizr.model("VS_7_ogn_reports", ReportSchema);
const ReportLogs = con_quizr.model("VS_7_ogn_report_logs", ReportSchema);

module.exports = { Reports, ReportLogs };