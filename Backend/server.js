const app = require("./app.js");
const cloudinary = require('cloudinary');
const {config} = require("dotenv");
const connectDb = require("./config/database.js");

// Uncaught error On top
process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`due to uncaught error server is shut down :) :) :)`);
    process.exit(1);
})


config({
    path : "backend/config/config.env"
})
// always call after config
connectDb();

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.API_KEY,
    api_secret : process.env.SECRET_KEY,
})

const server = app.listen(process.env.PORT,()=>{
    console.log(`Port is listening ${process.env.PORT}`);
});

// unhandle promise rejection bottom

process.on("unhandledRejection", (err) =>{
    console.log(`Error : ${err.message}`);
    console.log(`Shut down due to unhandle promise rejection :) :) :)`);

    server.close(()=>{
        process.exit(1);
    })
})
