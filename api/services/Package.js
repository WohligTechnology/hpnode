var objectid = require("mongodb").ObjectId;
var schema = new Schema({
    name: {
        type: String,
        default: ""
    },
    duration:{
      type:String,
      default:""
    },
    price:{
        type: String,
        default: ""
    },
    status: {
        type: String,
        enum:["true","false"]
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        index: true
    },
    pack:[{
      day:String,
      image:String,
      description:String,
      activities: [{
          type: Schema.Types.ObjectId,
          ref: 'Activities',
          index: true
      }]
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Package', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getPack:function(data,callback){
      Package.findOne({
      _id:data._id
    }).exec(function(err, found){
      if(err){
        // console.log(err);
        callback(err, null);
      }else {
        // console.log(found,"000");
        var data ={};
        data.results = found.pack;
        if(found && found.pack.length>0){
        callback(null,data);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },

  getOnePack: function(data, callback){
    Package.aggregate([{
      $unwind: "$pack"
    },{
      $match:{
        "pack._id":objectid(data._id)
      }
    }
    ,{
      $project:{
        "pack._id":1,
        "pack.image":1,
        "pack.description":1,
        "pack.day":1,
        "pack.activities":1
      }
    }
  ]).exec(function(err, found){
      if(err){
        console.log(err);
        callback(err, null);
      }else {
  callback(null, found[0].pack);
    }});
  },

  savePack: function(data, callback) {
         if (!data._id) {
             Package.update({
                 _id: data.Package
             }, {
                 $push: {
                     pack: data
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
                  var attribute = "pack.$.";
                  _.forIn(data, function(value, key) {
                      tobechanged[attribute + key] = value;
                  });
                  Package.update({
                      "pack._id": data._id
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
     deletePack: function(data, callback) {
   Package.update({
   "pack._id": data._id
   }, {
   $pull: {
   "pack": {
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


  };
module.exports = _.assign(module.exports, exports, model);
