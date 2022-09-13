const mongoose = require("mongoose");
const { con_prograd_recruit } = require("../config/connection.mongo");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const GlobalAutoincrementSchema = new Schema(
    {
        field: {
            type: String
        },
        field_id: {
            type: String
        },
        next_id: {
            type: Number
        }
    },
    { versionKey: false }
)


const GlobalAutoIncrement = con_prograd_recruit.model("global_autoincrement", 
GlobalAutoincrementSchema);

module.exports = GlobalAutoIncrement;