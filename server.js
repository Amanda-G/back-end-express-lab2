const express = require("express");

const cors = require("cors");

const { todoRoutes } = require("./routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", todoRoutes);

const port = 3000;

app.listen(port, () => console.log(`Listening on port: ${port}.`));