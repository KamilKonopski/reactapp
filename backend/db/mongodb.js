const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connect() {
	try {
		await mongoose.connect(process.env.DATABASE_API_URL);
		console.log("connected");
	} catch (err) {
		console.log(err);
	}
}

connect();
