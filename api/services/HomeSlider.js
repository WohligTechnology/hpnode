var schema = new Schema({
  image:{
    type:String
  },
  order: {
      type: Number,
      default: 0
  },
  status: {
      type: String,
      enum:["true","false"]
  },
  url: {
    type:String
  }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('HomeSlider', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
