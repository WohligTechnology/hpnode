var objectid = require("mongodb").ObjectId;
var schema = new Schema({
    name:{
        type: String,
        default: ""
    },
    banner:String,
    thumbnail:String,
    description:{
      type:String,
      default:""
    },
    parent:{
      type: Schema.Types.ObjectId,
      ref: 'Category',
      index: true
    },
    status: {
        type: String,
        enum:["true","false"]
    }
});

schema.plugin(deepPopulate, {

});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Category', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {


};
module.exports = _.assign(module.exports, exports, model);
