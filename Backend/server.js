const app = require("./app.js");

const {config} = require("dotenv");
const connectDb = require("./config/database.js");

config({
    path : "backend/config/config.env"
})
// always call after config
connectDb();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Port is listening ${process.env.PORT}`);
});



process.on("unhandledRejection", (err) =>{
    console.log(`Error : ${err.message}`);
    console.log(`Shut down due to unhandle promise rejection :) :) :)`);

    server.close(()=>{
        process.exit(1);
    })
})