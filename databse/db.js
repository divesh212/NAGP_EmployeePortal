const mongoose = require('mongoose');

function connectToDatabase(dbUrl) {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology:true });

    const connection = mongoose.connection;
    connection.on('error', () => {
        console.log("Error while connecting to MongoDB");
    })
}

module.exports = {
    connectToDatabase
}