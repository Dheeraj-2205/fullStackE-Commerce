const app = require("./app.js");

const {config} = require("dotenv");
const connectDb = require("./config/databse.js");

config({
    path : "backend/config/config.env"
})
// always call after config
connectDb();
app.listen(process.env.PORT, ()=>{
    console.log(`Port is listening ${process.env.PORT}`);
})