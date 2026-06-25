const mongoose = require("mongoose");

const connectDB = async () => {
try {

console.log(
"Connecting:",
process.env.MONGO_URL
);

await mongoose.connect(
process.env.MONGO_URL
);

console.log(
"✅ MongoDB Connected"
);

} catch (err) {

console.log(
"DB ERROR:",
err.message
);

process.exit(1);

}
};

module.exports = connectDB;