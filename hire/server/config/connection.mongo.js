const mongoose = require("mongoose");
const keys = require("./keys");
const env = process.env.NODE_ENV;
const conf = keys.mongodb[env];

let prograd_recruit_connectionString;
let prograd_connectionString;
let quzir_platform_connectionString;
let quizr_connectionString;

mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

switch (env) {
  case "local":
    quzir_platform_connectionString = `mongodb://${conf.host}:${conf.port}/${conf.database}`;
    break;
  case "dev":
    prograd_recruit_connectionString = `mongodb://${conf[0].username}:${conf[0].password}@${conf[0].host}:${conf[0].port},${conf[0].host_1}:${conf[0].port_1},${conf[0].host_2}:${conf[0].port_2}/${conf[0].database}?ssl=true&replicaSet=${conf[0].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
    prograd_connectionString = `mongodb://${conf[1].username}:${conf[1].password}@${conf[1].host}:${conf[1].port},${conf[1].host_1}:${conf[1].port_1},${conf[1].host_2}:${conf[1].port_2}/${conf[1].database}?ssl=true&replicaSet=${conf[1].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
    quzir_platform_connectionString = `mongodb://${conf[2].username}:${conf[2].password}@${conf[2].host}:${conf[2].port},${conf[2].host_1}:${conf[2].port_1},${conf[2].host_2}:${conf[2].port_2}/${conf[2].database}?ssl=true&replicaSet=${conf[2].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
    quizr_connectionString = `mongodb://${conf[3].username}:${conf[3].password}@${conf[3].host}:${conf[3].port},${conf[3].host_1}:${conf[3].port_1},${conf[3].host_2}:${conf[3].port_2}/${conf[3].database}?ssl=true&replicaSet=${conf[3].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
    break;
  case "staging":
  case "preprod":
  case "prod":
    prograd_recruit_connectionString = `mongodb://${conf[0].username}:${conf[0].password}@${conf[0].host}:${conf[0].port},${conf[0].host_1}:${conf[0].port_1},${conf[0].host_2}:${conf[0].port_2}/${conf[0].database}?ssl=true&replicaSet=${conf[0].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
    prograd_connectionString = `mongodb://${conf[1].username}:${conf[1].password}@${conf[1].host}:${conf[1].port},${conf[1].host_1}:${conf[1].port_1},${conf[1].host_2}:${conf[1].port_2}/${conf[1].database}?ssl=true&replicaSet=${conf[1].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
    quzir_platform_connectionString = `mongodb://${conf[2].username}:${conf[2].password}@${conf[2].host}:${conf[2].port},${conf[2].host_1}:${conf[2].port_1},${conf[2].host_2}:${conf[2].port_2}/${conf[2].database}?ssl=true&replicaSet=${conf[2].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
    quizr_connectionString = `mongodb://${conf[3].username}:${conf[3].password}@${conf[3].host}:${conf[3].port},${conf[3].host_1}:${conf[3].port_1},${conf[3].host_2}:${conf[3].port_2}/${conf[3].database}?ssl=true&replicaSet=${conf[3].replicaSet}&readPreference=secondaryPreferred&authSource=admin`;
    break;
}

console.log(env);

var con_prograd_recruit = mongoose.createConnection(
  prograd_recruit_connectionString
);
var con_prograd = mongoose.createConnection(prograd_connectionString);
var con_quizr_platform = mongoose.createConnection(
  quzir_platform_connectionString
);
var con_quizr = mongoose.createConnection(quizr_connectionString);

module.exports = {
  con_prograd_recruit,
  con_quizr_platform,
  con_quizr,
  con_prograd,
};
