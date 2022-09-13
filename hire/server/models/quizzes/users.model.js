const mongoose = require("mongoose");
const { con_quizr_platform } = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        department: {
            type: String,
            required: false
        },
        user_type: {
            type: Number,
            required: true
        },
        uid: {
            type: Number,
            required: true,
            unique: true
        },
        sid: {
            type: Number,
            required: false
        },
        o_id: {
            type: String,
            required: true
        },
        status : {
            type: Number,
            required: true,
            default: 0
        },
        invited_on: {
            type: Number,
            required: true
        },
        invite_status: {
            type: Number,
            required: true,
            default: 0
        },
        joined_on: {
            type: Number,
            required: false
        },
        last_active: {
            type: Number,
            required: true
        },
        group: {
            type: Array,
            required: false
        },
        pswd: {
            type: String,
            required: false
        },
        pswd_status: {
            type: Number,
            required: true,
            default: 0
        },
        deactivated_on: {
            type: Number,
            required: false
        },
        vcode: {
            type: String,
            required: false
        },
        mfa_enabled: {
            type: Boolean,
            required: false,
            default: false
        },
        mfa: {
            type: Object,
            required: false
        }
    },
    { 
        versionKey: false, 
        strict: false
    }
)

// Compound Index
UserSchema.index({email: 1, o_id: 1}, {unique: true});

module.exports = Users = con_quizr_platform.model("users", UserSchema);