var objectid = require("mongodb").ObjectId;
var schema = new Schema({
  name: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["true", "false"]
  },
  content: [{
    name: String,
    description: String,
    status: {
      type: String,
      enum: ["true", "false"]
    }
  }]

});

schema.plugin(deepPopulate, {});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
module.exports = mongoose.model('Metal', schema);

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
  getContent: function(data, callback) {
    Metal.findOne({
      _id: data._id
    }).exec(function(err, found) {
      if (err) {
        // console.log(err);
        callback(err, null);
      } else {
        // console.log(found,"000");
        var data = {};
        data.results = found.content;
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

  getOneContent: function(data, callback) {
    Metal.aggregate([{
      $unwind: "$content"
    }, {
      $match: {
        "content._id": objectid(data._id)
      }
    }, {
      $project: {
        "content.name": 1,
        "content.description": 1,
        "content.status": 1,
        "content._id": 1
      }
    }]).exec(function(err, found) {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, found[0].content);
      }
    });
  },

  deleteContent: function(data, callback) {
    Metal.update({
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

  saveContent: function(data, callback) {
    //  var product = data.product;
    //  console.log(product);
    console.log("dddddd", data);
    if (!data._id) {
      Metal.update({
        _id: data.Metal
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
      Metal.update({
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
};
module.exports = _.assign(module.exports, exports, model);
