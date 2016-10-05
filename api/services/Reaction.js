var objectid = require("mongodb").ObjectId;
var schema = new Schema({
    name: {
        type: String,
        default:""
    },
    status: {
        type: String,
        enum:["true","false"]
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Reaction', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
