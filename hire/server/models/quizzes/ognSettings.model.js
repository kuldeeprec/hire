const mongoose = require("mongoose");
const { con_quizr_platform } = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const OgnSettingsSchema = new Schema(
    {
        id: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        activation_status: {
            type: Number,
            required: true
        },
        demo_status: {
            type: Number,
            required: true
        },
        domain: {
            type: String,
            required: true
        },
        updatedAt: {
            type: Number,
            required: true
        },
        addons: {
            type: Array,
            required: true
        },
        plan: {
            type: Number,
            required: true
        },
        credits: {
            type: Number,
            required: true
        },
        tags: {
            type: Array,
            required: false
        }
    },
    { versionKey: false }
);

module.exports = OgnSettings = con_quizr_platform.model("ogn_settings", OgnSettingsSchema);