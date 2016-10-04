module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getImages:function(req,res){
    if(req.body){
      WhatsHot.getImages(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getVideos:function(req,res){
    if(req.body){
      WhatsHot.getVideos(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getPricing:function(req,res){
    if(req.body){
      WhatsHot.getPricing(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getOneImages:function(req,res){
    if(req.body){
      WhatsHot.getOneImages(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getOneVideos:function(req,res){
    if(req.body){
      WhatsHot.getOneVideos(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getOnePricing:function(req,res){
    if(req.body){
      WhatsHot.getOnePricing(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  saveImages:function(req,res){
    if(req.body){
      WhatsHot.saveImages(req.body,res.callback);
    }
    else{
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  saveVideos:function(req,res){
    if(req.body){
      WhatsHot.saveVideos(req.body,res.callback);
    }
    else{
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  savePricing:function(req,res){
    if(req.body){
      WhatsHot.savePricing(req.body,res.callback);
    }
    else{
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  deleteImages: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
  WhatsHot.deleteImages(req.body, function(err, respo) {
  if (err) {
  res.json({
  value: false,
  data: err
  });
  } else {
  res.json({
  value: true,
  data: respo
  });
  }
  });
  } else {
  res.json({
  value: false,
  data: "Invalid Id"
  });
  }
  } else {
  res.json({
  value: false,
  data: "Invalid call"
  });
  }
  },
  deletePricing: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
  WhatsHot.deletePricing(req.body, function(err, respo) {
  if (err) {
  res.json({
  value: false,
  data: err
  });
  } else {
  res.json({
  value: true,
  data: respo
  });
  }
  });
  } else {
  res.json({
  value: false,
  data: "Invalid Id"
  });
  }
  } else {
  res.json({
  value: false,
  data: "Invalid call"
  });
  }
},
  deleteVideos: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
  WhatsHot.deleteVideos(req.body, function(err, respo) {
  if (err) {
  res.json({
  value: false,
  data: err
  });
  } else {
  res.json({
  value: true,
  data: respo
  });
  }
  });
  } else {
  res.json({
  value: false,
  data: "Invalid Id"
  });
  }
  } else {
  res.json({
  value: false,
  data: "Invalid call"
  });
  }
  }
};
module.exports = _.assign(module.exports, controller);
