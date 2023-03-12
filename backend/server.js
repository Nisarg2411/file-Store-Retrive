const express = require("express");
const connectionDB = require("./config/connnectionDB");
const { errorHandler } = require("./middleware/errorHandler");
const { uploadFile, getAllFiles } = require("./controllers/fileController");
const cors = require("cors");
require("dotenv").config();
const app = express();

connectionDB();

app.use("/uploadFolder", express.static("backend/uploadFolder"));

app.use(express.json());
app.use(cors());

app.post("/api/upload", uploadFile);
app.get("/getall", getAllFiles);

app.use(errorHandler);

app.listen(4000, () => console.log("Running on 4000"));
