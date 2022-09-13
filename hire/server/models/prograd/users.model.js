const mongoose = require("mongoose");
const { con_prograd } = require("../../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const userSchema = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    user_type: {
        type: Number,
        required: true,
        default: 1
    },
    password: {
        type: String,
        required: false
    },
    firstName: {
        type: String,
        required: false,
        default: ""
    },
    lastName: {
        type: String,
        required: false,
        default: ""
    },
    prefix: {
        type: String,
        required: false
    },
    mobileNumber: {
        type: String,
        required: false
    },
    altPrefix: {
        type: String,
        required: false
    },
    altMobileNumber: {
        type: String,
        required: false
    },
    degree: {
        type: String,
        required: false
    },
    stream: {
        type: String,
        required: false
    },
    college: {
        type: String,
        required: false
    },
    yop: {
        type: Number,
        required: false
    },
    workStatus: {
        type: Number,
        required: false
    },
    company: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    mobileVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    profilePic: {
        type: String,
        required: false,
        default: 'https://cdn.prograd.org/upp/default.png'
    },
    portfolio: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    }, 
    github: {
        type: String,
        required: false
    },
    regSrc: {
        type: String,
        required: false
    },
    hasLaptop: {
        type: Number,
        required: false
    },
    hasStableNet: {
        type: Number,
        required: false
    },
    utm_source: {
        type: String,
        required: false
    },
    utm_campaign: {
        type: String,
        required: false
    },
    subscriptions: {
        type: {
            bootcamp: Boolean,
            microdegree: Boolean,
            mdRegTime: Date,
            bcRegTime: Date,
            mdSource: String
        },
        required: false
    },
    registrationTime: {
        type: Number,
        required: false
    },
    lastActive : {
        type: Number,
        required: true,
        default: 1
    },
    invitationStatus: {
        type: Number,
        required: true,
        default: 0
    },
    userConsent: {
        type: Boolean,
        required: false,
        default: false
    },
    socialAuth: {
        type: {
            google: String,
            github: String,
            linkedin: String
        },
        required: false,
        default: {
            google: undefined,
            github: undefined,
            linkedin: undefined
        }
    },
    vcode: {
        type: String,
    },
    vcode_expiry: {
        type: String,
    },
    notifications: {
        type: Boolean,
        required: true,
        default: false
    },
    isProfileSetup: {
        type: Boolean,
        required: false,
        default: false
    },
    isTrialActivated: {
        type: Boolean,
        required: false,
        default: false
    },
    g_p: {
        type: Number,
        required: false,
    },
    userName: {
        type: String,
        required: false,
    },
    program: {
        type: Array,
        required: true,
        default: []
    },
    about: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    pgCollege: {
        type: String,
        required: false
    },
    pgStream: {
        type: String,
        required: false
    },
    pgYop: {
        type: Number,
        required: false
    },
    clgState: {
        type: String,
        required: false
    },
    clgEmail: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    sslcPercentage: {
        type: Number,
        required: false
    },
    hscPercentage: {
        type: Number,
        required: false
    },
    percentage: {
        type: Number,
        required: false
    },
    pgPercentage: {
        type: Number,
        required: false
    },
    interpersonalSkills: {
        type: Array,
        required: false
    },
    technologiesKnown: {
        type: Array,
        required: false
    },
    resume: {
        type: String,
        required: false
    },
    hoa: {
        type: Number,
        required: false
    },
    noa: {
        type: Number,
        required: false
    },
    pgHoa: {
        type: Number,
        required: false
    },
    pgNoa: {
        type: Number,
        required: false
    },
    workExperience: {
        type: Number,
        required: false
    },
    projects: {
        type: Array,
        required: false
    },
    companies: {
        type: Array,
        required: false
    }
}, { versionKey: false });

module.exports = Users = con_prograd.model("users",userSchema);