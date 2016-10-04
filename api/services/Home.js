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

var exports = _.cloneDeep(require("sails-wohlig-service")(schema,"category","category"));
var model = {

  getCategory:function(data,callback){
      Home.findOne({
      _id:data._id
    }).exec(function(err, found){
      if(err){
        callback(err, null);
      }else {
        // console.log(found,"000");
        var data ={};
        data.results = found.category;
        if(found){
        callback(null,data);
      }else{
        callback(null,{message:"No Data Found"});
      }
      }

    })
  },
  saveHomeCategory: function(data, callback) {
    if (!data._id) {
             Home.update({
                 _id: data.Home
             }, {
                 $push: {
                     category: data.category
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
             var attribute = "category.$.";
             _.forIn(data, function(value, key) {
                 tobechanged[attribute + key] = value;
             });
             Home.update({
                 "category._id": data._id
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

   deleteHomeCategory: function(data, callback) {
   Home.update({
   "category._id": data._id
   }, {
   $pull: {
   "category": {
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
   getOneHomeCategory: function(data, callback){
     Home.aggregate([{
       $unwind: "$category"
     },{
       $match:{
         "category._id":objectid(data._id)
       }
     },{
       $project:{
        "category.status":1,
         "category.image":1,
         "category._id":1,
         "category.order":1,
         "category.name":1
       }
     }
   ]).exec(function(err, found){
       if(err){
         console.log(err);
         callback(err, null);
       }else {
   callback(null, found[0].category);
     }});
   },
};
module.exports = _.assign(module.exports, exports, model);
