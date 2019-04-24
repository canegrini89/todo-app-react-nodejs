const express = require("express");
const morgan = require("morgan");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

// Initialization
const app = express();
app.use(cors());
require("./database");

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer instance
const storage = multer.diskStorage({
  destination: path.join(__dirname + "/public/img/uploads"),
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

app.use(multer({ storage: storage }).single("image"));

// Routes
app.use("/todos", require("./routes/index"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
