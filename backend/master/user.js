const express = require("express");
const router = express.Router();
const x = require("../data/User");
const {application} = require("express");

router.post("/",async(req,res)=>{   
    const us = new x({
        name:req.body.name,
    });
    const data = await us.save();
    res.json(data);
});

router.get("/",async (req,res) =>{
    const us = await x.find();
    res.json(us);
});
router.get("/:id", async (req,res) => {
    const us = await x.findById(req.params.id);
    res.json(us); 
});

router.delete("/:id", async (req, res) => {
    const removedUser = await x.deleteOne({ _id: req.params.id });
    res.json(removedUser);
  });

router.patch("/:id",async (req,res) =>{
    const updateUser = await x.updateOne(
        { _id : req.params.id} ,
        { $set: {name: req.body.name }}
    );
    res.json(updateUser);
});

module.exports = router;