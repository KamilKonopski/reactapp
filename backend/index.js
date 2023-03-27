const express = require("express");
const cors = require("cors");

const apiRouter = require("./routes/api");

const app = express();
const port = 8888;

app.use(cors());
app.use(express.json());

require("./db/mongodb");

app.use("/", apiRouter);

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
