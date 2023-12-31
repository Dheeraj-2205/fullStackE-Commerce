const mongoose=  require("mongoose");

const connectDb = () =>{
    mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser : true, useUnifiedTopology : true})
    .then((data)=>{
        console.log(`db is connected successfully ${data.connection.host}`);
    })
}

module.exports = connectDb;