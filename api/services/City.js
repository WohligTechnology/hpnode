var schema = new Schema({
    cityName: {
        type: String,
        default:""
    },
    country: {
        type: String,
        default:""
    },
    content:{
      type: String,
      default:""
    },
    image:{
      type:String,
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
module.exports = mongoose.model('City', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
