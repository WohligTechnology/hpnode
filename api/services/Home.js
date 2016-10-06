var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name:String,
  banner:String,
  image:String,
  imgname:String,
  description:String,
  });

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Home', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
