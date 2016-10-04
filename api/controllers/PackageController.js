module.exports = _.cloneDeep(require("sails-wohlig-controller"));
var controller = {

  getPack:function(req,res){
    if(req.body){
      Package.getPack(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  getOnePack:function(req,res){
    if(req.body){
      Package.getOnePack(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },
  savePack:function(req,res){
    if(req.body){
      Package.savePack(req.body,res.callback);
    }
    else {
      res.json({value:false,data:{message:"Invalid Request"}})
    }
  },

  deletePack: function(req, res) {
if (req.body) {
if (req.body._id && req.body._id !== "") {
//	console.log("not valid");
Package.deletePack(req.body, function(err, respo) {
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
};
module.exports = _.assign(module.exports, controller);
