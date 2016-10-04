var objectid = require("mongodb").ObjectId;
var schema = new Schema({
    name: {
        type: String,
        default:""
    },
    banner: {
        type: String,
        default:""
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        index: true
    },
    date:{
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        enum:["true","false"]
    },
    images:[{
      image:{
          type: String,
          default:""
      },
      order:{
          type: Number,
          default: 0
      },
      status: {
          type: String,
          enum:["true","false"]
      }
    }],
    videos:[{
      url:{
          type: String,
          default:""
      },
      thumbnail:{
          type: String,
          default:""
      },
      order:{
          type: Number,
          default: 0
      },
      status: {
          type: String,
          enum:["true","false"]
      }
    }],
    cruiserate:{
      type:Number,
      default:0
    },
    date:{
      type:Date
    },
    pricing:[{
      paxcabin1: {
          type: String,
          default:""
      },
      paxcabin2: {
          type: String,
          default:""
      },
      paxcabin3: {
          type: String,
          default:""
      },
      text: {
          type: String,
          default:""
      }
    }]
});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('WhatsHot', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getImages:function(data,callback){
    console.log(data);
      WhatsHot.findOne({
      _id:data._id
    }).exec(function(err, found){
      if(err){
        // console.log(err);
        callback(err, null);
      }else {
        // console.log(found,"000");
        var data ={};
        data.results = found.images;
        if(found && found.images.length>0){
        callback(null,data);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },
  getVideos:function(data,callback){
      WhatsHot.findOne({
      _id:data._id
    }).exec(function(err, found){
      if(err){
        // console.log(err);
        callback(err, null);
      }else {
        // console.log(found,"000");
        var data ={};
        data.results = found.videos;
        if(found && found.videos.length>0){
        callback(null,data);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },
  getPricing:function(data,callback){
      WhatsHot.findOne({
      _id:data._id
    }).exec(function(err, found){
      if(err){
        // console.log(err);
        callback(err, null);
      }else {
        // console.log(found,"000");
        var data ={};
        data.results = found.pricing;
        if(found && found.pricing.length>0){
        callback(null,data);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },
  getOneImages: function(data, callback){
    WhatsHot.aggregate([{
      $unwind: "$images"
    },{
      $match:{
        "images._id":objectid(data._id)
      }
    },{
      $project:{
        "images.image":1,
        "images.order":1,
        "images.status":1,
        "images._id":1
      }
    }
  ]).exec(function(err, found){
      if(err){
        console.log(err);
        callback(err, null);
      }else {
  callback(null, found[0].images);
    }});
  },
  getOneVideos: function(data, callback){
    WhatsHot.aggregate([{
      $unwind: "$videos"
    },{
      $match:{
        "videos._id":objectid(data._id)
      }
    },{
      $project:{
        "videos.url":1,
        "videos.thumbnail":1,
        "videos.order":1,
        "videos.text":1,
        "videos._id":1,
        "video.status":1
      }
    }
  ]).exec(function(err, found){
      if(err){
        console.log(err);
        callback(err, null);
      }else {
  callback(null, found[0].videos);
    }});
  },
  getOnePricing: function(data, callback){
    WhatsHot.aggregate([{
      $unwind: "$pricing"
    },{
      $match:{
        "pricing._id":objectid(data._id)
      }
    },{
      $project:{
        "pricing.paxcabin1":1,
        "pricing.paxcabin2":1,
        "pricing.paxcabin3":1,
        "pricing.text":1,
        "pricing.image":1,
        "pricing._id":1
      }
    }
  ]).exec(function(err, found){
      if(err){
        console.log(err);
        callback(err, null);
      }else {
  callback(null, found[0].pricing);
    }});
  },

  saveImages: function(data, callback) {
        //  var product = data.product;
        //  console.log(product);
        // console.log("dddddd",data);
         if (!data._id) {
             WhatsHot.update({
                 _id: data.WhatsHot
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
             WhatsHot.update({
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

     saveVideos: function(data, callback) {
           //  var product = data.product;
           //  console.log(product);
           // console.log("dddddd",data);
            if (!data._id) {
                WhatsHot.update({
                    _id: data.WhatsHot
                }, {
                    $push: {
                        videos: data
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
                var attribute = "videos.$.";
                _.forIn(data, function(value, key) {
                    tobechanged[attribute + key] = value;
                });
                WhatsHot.update({
                    "videos._id": data._id
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
        savePricing: function(data, callback) {
              //  var product = data.product;
              //  console.log(product);
              // console.log("dddddd",data);
               if (!data._id) {
                   WhatsHot.update({
                       _id: data.WhatsHot
                   }, {
                       $push: {
                           pricing: data
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
                   var attribute = "pricing.$.";
                   _.forIn(data, function(value, key) {
                       tobechanged[attribute + key] = value;
                   });
                   WhatsHot.update({
                       "pricing._id": data._id
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

     deleteImages: function(data, callback) {
   WhatsHot.update({
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
   deleteVideos: function(data, callback) {
 WhatsHot.update({
 "videos._id": data._id
 }, {
 $pull: {
 "videos": {
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
 deletePricing: function(data, callback) {
WhatsHot.update({
"pricing._id": data._id
}, {
$pull: {
"pricing": {
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
}
};
module.exports = _.assign(module.exports, exports, model);
