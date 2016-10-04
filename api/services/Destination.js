var objectid = require("mongodb").ObjectId;
var schema = new Schema({
    name: {
        type: String,
        default: ""
    },
    description:String,
    banner: {
        type: String,
        default: ""
    },
    image: {
      type: String,
      default: ""
    },
    video:String,
    status: {
        type: String,
        enum:["true","false"]
    },
    type:{
      type:String,
      enum:["Popular Destination","Popular Attraction"]
    },
    accomodation:[{
      image:{
        type:String,
        default:""
      },
      hotelName:{
        type:String,
        default:""
      }
    }],
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        index: true
    },

    content:[{
      name:String,
      description:String,
      status: {
          type: String,
          enum:["true","false"]
      },
      order:Number
    }],

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Destination', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getAccomodation:function(data,callback){
      Destination.findOne({
      _id:data._id
    }).exec(function(err, found){
      if(err){
        // console.log(err);
        callback(err, null);
      }else {
        // console.log(found,"000");
        var data ={};
        data.results = found.accomodation;
        if(found && found.accomodation.length>0){
        callback(null,data);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },
  getActivities:function(data,callback){
      Destination.findOne({
      _id:data._id
    }).exec(function(err, found){
      if(err){
        // console.log(err);
        callback(err, null);
      }else {
        // console.log(found,"000");
        var data ={};
        data.results = found.activities;
        if(found && found.activities.length>0){
        callback(null,data);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },
  getContent:function(data,callback){
      Destination.findOne({
      _id:data._id
    }).exec(function(err, found){
      if(err){
        // console.log(err);
        callback(err, null);
      }else {
        // console.log(found,"000");
        var data ={};
        data.results = found.content;
        if(found && found.content.length>0){
        callback(null,data);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },
  getOneAccomodation: function(data, callback){
    Destination.aggregate([{
      $unwind: "$accomodation"
    },{
      $match:{
        "accomodation._id":objectid(data._id)
      }
    },{
      $project:{
        "accomodation.hotelName":1,
        "accomodation.image":1,
        "accomodation._id":1
      }
    }
  ]).exec(function(err, found){
      if(err){
        console.log(err);
        callback(err, null);
      }else {
  callback(null, found[0].accomodation);
    }});
  },

  getOneContent: function(data, callback){
    Destination.aggregate([{
      $unwind: "$content"
    },{
      $match:{
        "content._id":objectid(data._id)
      }
    }
    ,{
      $project:{
        "content.name":1,
        "content.description":1,
        "content.order":1,
        "content.status":1,
        "content._id":1,
        "content.video":1
      }
    }
  ]).exec(function(err, found){
      if(err){
        console.log(err);
        callback(err, null);
      }else {
  callback(null, found[0].content);
    }});
  },
  // getOneActivities: function(data, callback){
  //   Destination.aggregate([{
  //     $unwind: "$activities"
  //   },{
  //     $match:{
  //       "activities._id":objectid(data._id)
  //     }
  //   }
  //   ,{
  //     $project:{
  //       "activities.name":1,
  //       "activities.image1":1,
  //       "activities.image2":1,
  //       "activities.type":1,
  //       "activities._id":1
  //     }
  //   }
  // ]).exec(function(err, found){
  //     if(err){
  //       console.log(err);
  //       callback(err, null);
  //     }else {
  // callback(null, found[0].activities);
  //   }});
  // },
  deleteContent: function(data, callback) {
Destination.update({
"content._id": data._id
}, {
$pull: {
"content": {
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
  deleteAccomodation: function(data, callback) {
Destination.update({
"accomodation._id": data._id
}, {
$pull: {
"accomodation": {
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

// deleteActivities: function(data, callback) {
// Destination.update({
// "activities._id": data._id
// }, {
// $pull: {
// "activities": {
// "_id": objectid(data._id)
// }
// }
// }, function(err, updated) {
// console.log(updated);
// if (err) {
// console.log(err);
// callback(err, null);
// } else {
// callback(null, updated);
// }
// });
// },
  saveAccomodation: function(data, callback) {
    if (!data._id) {
             Destination.update({
                 _id: data.Destination
             }, {
                 $push: {
                     accomodation: data
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
             var attribute = "accomodation.$.";
             _.forIn(data, function(value, key) {
                 tobechanged[attribute + key] = value;
             });
             Destination.update({
                 "accomodation._id": data._id
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


     saveContent: function(data, callback) {
           //  var product = data.product;
           //  console.log(product);
   console.log("dddddd",data);
            if (!data._id) {
                Destination.update({
                    _id: data.Destination
                }, {
                    $push: {
                        content: data
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
                var attribute = "content.$.";
                _.forIn(data, function(value, key) {
                    tobechanged[attribute + key] = value;
                });
                Destination.update({
                    "content._id": data._id
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
        }

    //  saveActivities: function(data, callback) {
    //         console.log("dddddd",data);
    //         if (!data._id) {
    //             Destination.update({
    //                 _id: data.Destination
    //             }, {
    //                 $push: {
    //                     activities: data
    //                 }
    //             }, function(err, updated) {
    //                 if (err) {
    //                     console.log(err);
    //                     callback(err, null);
    //                 } else {
    //                     callback(null, updated);
    //                 }
    //             });
    //         } else {
    //             data._id = objectid(data._id);
    //             tobechanged = {};
    //             var attribute = "activities.$.";
    //             _.forIn(data, function(value, key) {
    //                 tobechanged[attribute + key] = value;
    //             });
    //             Destination.update({
    //                 "activities._id": data._id
    //             }, {
    //                 $set: tobechanged
    //             }, function(err, updated) {
    //                 if (err) {
    //                     console.log(err);
    //                     callback(err, null);
    //                 } else {
    //                     callback(null, updated);
    //                 }
    //             });
    //         }
    //     }
};
module.exports = _.assign(module.exports, exports, model);
