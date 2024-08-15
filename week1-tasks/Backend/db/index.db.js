const mongoose = require('mongoose');
const db_name = require('../constants/constant.values');
const db = process.env.MONGO_URI || 'mongodb+srv://abhinavnair7404:Abc1234@cluster0.3dau0gk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connection_DB = async () => {
    try {
        const con = await mongoose.connect(db);
        console.log(`Database connected successfully DB HOST: ${con.connection.host}`);
    } catch (e) {
        console.error(`Mongo Connection Failed: ${e.message}`);
        process.exit(1); 
    }
}

module.exports = connection_DB;
