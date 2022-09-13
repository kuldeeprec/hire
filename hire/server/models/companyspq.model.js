const mongoose = require("mongoose");
const { con_prograd_recruit } = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const CompanySpqSchema = new Schema(
  {
    o_id: { type: String, required: true },
    role_id: {
      type: String,
      required: true,
    },
    questionId: { type: String },
    questionType: { type: String, required: true },
    questionText: { type: String, required: true },
    options: { type: Array },
  },
  { versionKey: false }
);

module.exports = CompanySpq = con_prograd_recruit.model(
  "companyspqs",
  CompanySpqSchema
);
