const mongoose = require("mongoose");
const { con_quizr } = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const InstanceSchema = new Schema(
    {
        author_id: {
            type: Number,
            required: true
        },
        author_ref: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        filter: {
            type: Array,
            required: true
        },
        instance_id: {
            type: String,
            required: true
        },
        instance_name: {
            type: String,
            required: true
        },
        instance_author: {
            type: Number,
            required: true
        },
        instance_author_ref: {
            type: String,
            required: true
        },
        instance_status: {
            type: Number,
            required: true
        },
        ip: {
            type: String,
            required: true
        },
        is_global: {
            type: Boolean,
            required: true
        },
        questions: {
            type: Object,
            required: true
        },
        settings: {
            type: Object,
            required: true
        },
        test_code: {
            type: String,
            required: true
        },
        test_desc: {
            type: String,
            required: false
        },
        test_id: {
            type: String,
            required: true
        },
        test_level: {
            type: Number,
            required: true
        },
        test_name: {
            type: String,
            required: true
        },
        test_sections: {
            type: Array,
            required: true
        },
        test_tags: {
            type: Array,
            required: true
        },
        test_type: {
            type: Number,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        status: {
            type: Number,
            required: false,
            default: 0
        }
    },
    { versionKey: false }
);

module.exports = Instances = con_quizr.model(
    "VS_7_ogn_instances", InstanceSchema
);