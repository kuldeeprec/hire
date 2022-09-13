const mongoose = require("mongoose");
const { con_quizr } = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const TestSchema = new Schema(
    {
        test_id: {
            type: String,
            required: true
        },
        catalog_id: {
            type: String,
            required: true
        },
        author_id: {
            type: Number,
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
        test_code: {
            type: String,
            required: true
        },
        test_level: {
            type: Number,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        test_desc: {
            type: String,
            required: false
        },
        test_sections: {
            type: Array,
            required: true
        },
        questions: {
            type: Object,
            required: true
        },
        filter: {
            type: Array,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        is_private: {
            type: Boolean,
            required: true
        },
        ip: {
            type: String,
            required: false
        },
        author_ref: {
            type: String,
            required: true
        },
        cutoff: {
            type: Number,
            required: false
        },
        cutoff_enabled: {
            type: Boolean,
            required: false
        },
        sec_cutoff_enabled: {
            type: Boolean,
            required: false
        },
        sec_ques_count_enabled: {
            type: Boolean,
            required: false
        },
        sec_timing_enabled: {
            type: Boolean,
            required: false
        },
        test_tags: {
            type: Array,
            required: false
        },
        status: {
            type: Number,
            required: false,
            default: 1
        }
    },
    { versionKey: false }
);


module.exports = Tests = con_quizr.model("VS_7_ogn_tests", TestSchema);