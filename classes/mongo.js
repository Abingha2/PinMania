const mongoose=require("mongoose")
let pins
const schema = new mongoose.Schema({
    "maker": String,//Maker of pin
    "name": String, // Name of the pin
    "dropPrice": Number, // Price of pin when dropped
    "category": String, // Category pin belongs in
    "series": String, //show or game that pin in from
    "plating": String, //plating pin is made from
    "le": Number,//amount of pieces made
    "img": String,//Image of pin
})
const db = mongoose.connection
function init(URI){
    mongoose.connect(URI)
    .then(()=> {
        console.log('The connection with mongod is established')
    pins=mongoose.model("pins",schema)
    })
}

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
db.on('connected', () => console.log('mongo connected'))
db.on('disconnected', () => console.log('mongo disconnected'))


async function dropCollection(collection){
    return await db.dropCollection(collection)
}

async function createCollection(collection){
    return await db.createCollection(collection);
}

async function insertOne(collection,data){
    return await db.collection(collection).insertOne(data);
}

async function insertMany(collection,data){
    return await db.collection(collection).insertMany(data);
}

async function find(filter,projections){
    return await pins.find(filter || {},projections || {}).exec()
}

async function findOne(filter,projections){
    return await pins.findOne(filter || {},projections || {}).exec()
}

async function findOneAndUpdate(filter,update){
    return await pins.findOneAndUpdate(filter || {}, update || {}).exec()
}

async function findOneAndDelete(filter){
    return await pins.findOneAndDelete(filter || {}).exec()
}


module.exports={
    insertOne,
    insertMany,
    createCollection,
    dropCollection,
    find,
    findOne,
    findOneAndUpdate,
    findOneAndDelete,
    init
}