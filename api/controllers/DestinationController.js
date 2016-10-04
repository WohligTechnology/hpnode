module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {
  getAccomodation:function(req,res){
    if(req.body){
      Destination.getAccomodation(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getActivities:function(req,res){
    if(req.body){
      Destination.getActivities(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getContent:function(req,res){
    if(req.body){
      Destination.getContent(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getOneAccomodation:function(req,res){
    if(req.body){
      Destination.getOneAccomodation(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getOneActivities:function(req,res){
    if(req.body){
      Destination.getOneActivities(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getOneContent:function(req,res){
    if(req.body){
      Destination.getOneContent(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  deleteAccomodation: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
Destination.deleteAccomodation(req.body, function(err, respo) {
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

deleteActivities: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
Destination.deleteActivities(req.body, function(err, respo) {
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


deleteContent: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
Destination.deleteContent(req.body, function(err, respo) {
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

  saveAccomodation:function(req,res){
    if(req.body){
      Destination.saveAccomodation(req.body,res.callback);
    }
    else{
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  saveActivities:function(req,res){
    if(req.body){
      Destination.saveActivities(req.body,res.callback);
    }
    else{
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  saveContent:function(req,res){
    if(req.body){
      Destination.saveContent(req.body,res.callback);
    }
    else{
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  }
};
module.exports = _.assign(module.exports, controller);
