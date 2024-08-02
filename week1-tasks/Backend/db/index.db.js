const mongoose = require('mongoose');
// const db_name = require('./constants/constant.values');
const db_name = require('../constants/constant.values')
const connection_DB = async ()=>{
    try{
        const con = await mongoose.connect(`${process.env.MONGO_URI}/${db_name}`);
        console.log(`Database connected successfully DB HOST:${con.connection.host}`);
    }catch(e){
        console.log("Mongo Connection Failed");
    }
}

module.exports = connection_DB