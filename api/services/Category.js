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
    },
    images: [{
      image: String,
      status: {
        type: String,
        enum: ["true", "false"]
      }
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Category', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {

  getHomeCategory:function(data,callback){
      Category.find({
    status:"true",
    parent:"57f5e14231801f0ddddb7da8"
  }).exec(function(err, found){
      if(err){
        callback(err, null);
      }else {
        if(found){
        callback(null,found);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },
  getCategory:function(data,callback){
      Category.find({
    status:"true",
    parent:data._id
  }).exec(function(err, found){
      if(err){
        callback(err, null);
      }else {
        if(found){
        callback(null,found);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },


  getImages: function(data, callback) {
    Category.findOne({
      _id: data._id
    }).exec(function(err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        // console.log(found,"000");
        var data = {};
        data.results = found.images;
        if (found) {
          callback(null, data);
        } else {
          callback(null, {
            message: "No Data Found"
          });
        }
      }

    })
  },

  getOneImages: function(data, callback) {
    Category.aggregate([{
      $unwind: "$images"
    }, {
      $match: {
        "images._id": objectid(data._id)
      }
    }, {
      $project: {
        "images.image": 1,
        "images.status": 1,
        "images._id": 1
      }
    }]).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, found[0].images);
      }
    });
  },

  deleteImages: function(data, callback) {
    Category.update({
      "images._id": data._id
    }, {
      $pull: {
        "images": {
          "_id": objectid(data._id)
        }
      }
    }, function(err, updated) {
      console.log(updated);
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, updated);
      }
    });
  },

  saveImages: function(data, callback) {
    //  var product = data.product;
    //  console.log(product);
    console.log("dddddd", data);
    if (!data._id) {
      Category.update({
        _id: data.Category
      }, {
        $push: {
          images: data
        }
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    } else {
      data._id = objectid(data._id);
      tobechanged = {};
      var attribute = "images.$.";
      _.forIn(data, function(value, key) {
        tobechanged[attribute + key] = value;
      });
      Category.update({
        "images._id": data._id
      }, {
        $set: tobechanged
      }, function(err, updated) {
        if (err) {
          console.log(err);
          callback(err, null);
        } else {
          callback(null, updated);
        }
      });
    }
  },
};
module.exports = _.assign(module.exports, exports, model);
