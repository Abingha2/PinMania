const router=require("express").Router()
const expStatic = require("express").static;
const mongo=require("../classes/mongo")

router.use("/css",expStatic("./css"))

router.get("/pins",(req,res)=>{
    res.render("index.ejs",{pins:["HELLO"]})
})
router.get("/pins/new",(req,res)=>{
    res.sendStatus(200)
})
router.post("/pins/:add",(req,res)=>{
    
})
router.get("/pins/:id",(req,res)=>{
    
})
router.get("/pins/:id/edit",(req,res)=>{
    
})
router.put("/pins/:id",(req,res)=>{
 
})


router.delete("/pins/:id",(req,res)=>{
    
})

module.exports=router