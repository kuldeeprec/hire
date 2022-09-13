const mongoose = require("mongoose");
const { con_prograd_recruit } = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const RoleSchema = new Schema(
  {
    role_id: {
      type: String,
      required: true,
    },
    role_name: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    batches: {
      type: Array,
      required: true,
      default: [],
    },
    o_id: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = Roles = con_prograd_recruit.model("roles", RoleSchema);
