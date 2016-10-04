var schema = new Schema({
    name: {
        type: String,
        default: ""
    },
    description:{
      type:String,
      default:""
    },
    image1:{
        type: String,
        default: ""
    },
    image2:{
        type: String,
        default: ""
    },
    type:{
      type:String,
      enum:["all","day","night"]
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        index: true
    },
    status: {
        type: String,
        enum:["true","false"]
    }
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Activities', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {};
module.exports = _.assign(module.exports, exports, model);
