const mongoose=  require("mongoose");

const connectDb = () =>{
    mongoose
    .connect(process.env.MONGO_URI, {dbName : "Ecommerce",useNewUrlParser : true, useUnifiedTopology : true})
    .then((data)=>{
        console.log(`db is connected successfully ${data.connection.host}`);
    })
    .catch((e) =>{
        console.log(`Opps something got error ${e}` );
    })
}

module.exports = connectDb;