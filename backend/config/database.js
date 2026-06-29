const mongoose = require("mongoose");
const dns = require("dns");

// Force a reliable DNS resolver for Atlas SRV lookups.
// Use public resolvers if the local DNS is blocking SRV requests.
 dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB=async()=>{
     await mongoose.connect(process.env.MY_CLUSTER)
}



module.exports = connectDB;

