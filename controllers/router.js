//adds express to app
const router=require("express").Router()
const expStatic = require("express").static;
//allows program to read urlcoded messages
const urlencoded = require('express').urlencoded
const { default: mongoose } = require("mongoose");
//adds mongo to the app
const mongo=require("../classes/mongo")
// const pins=require("../models/seed.js")
const methodOverride = require('method-override')

router.use(methodOverride('_method'))
router.use(urlencoded({extended: true}))
router.use("/css",expStatic("./css"))

//route to see homepage of users pins
router.get("/",(req,res)=>{
    res.redirect("/pins")
})
//route to see homepage of users pins
router.get("/pins",async (req,res)=>{
    const pins=await mongo.find({},{})
    res.render("index.ejs",{pins:pins})
})

//route to add pins to a users pin collection
router.get("/pins/new",async(req,res)=>{
    const pins=await mongo.find({},{})
    res.render("./new.ejs",{pins:pins})
})

//route the user to pins/new when using pins/add because I'm dumb and keep typing in pins/add ^_^
router.get("/pins/add",(req, res) => {
    res.redirect('/pins/new')
})

//route that takes the form the user fills out and submits it into the array of pins
router.post("/pins/add",async(req,res)=>{
    const result=await mongo.insertOne("pins",req.body)
    console.log(req.body)
    console.log(result)
    res.redirect("/pins")
})

//route used to allow user to search their collection by category
router.post("/pins/search",async(req,res)=>{
    const pins=await mongo.find({category:req.body.search},{})
    res.render("index.ejs",{pins:pins})
})
//route used for a user to find a specfic pin using the browser *ex pins/0
router.get("/pins/:id",async(req,res)=>{
    const pins=await mongo.find({},{})
    res.render("show.ejs", {pin:pins[parseInt(req.params.id)],index:req.params.id})
})

//route that allows a user to edit a pin from the array of their collection using a form
router.get("/pins/:id/edit",async(req,res)=>{
    const pins=await mongo.find({},{})
    res.render("./edit.ejs",{pin:pins[parseInt(req.params.id)],index:req.params.id})
 })

//router used to tells backend where each box of information that the user fills out in edit goes, so its in the correct slot. then redirects the user to the home page of PinMania
router.put("/pins/:id",async(req,res)=>{
    const edit =(await mongo.find({},{}))[parseInt(req.params.id)]._id
    const result=await mongo.findOneAndUpdate({_id:edit},{$set:req.body})
    res.redirect(`/pins/${req.params.id}`)
})

//router used to allow user to delete a pin from their collection
router.delete("/pins/:id",async(req,res)=>{
    console.log("Delete this you say")
    const del =(await mongo.find({},{}))[parseInt(req.params.id)]._id
    const result=await mongo.findOneAndDelete({_id:del})
    res.redirect(`/pins/`)
})

module.exports=router