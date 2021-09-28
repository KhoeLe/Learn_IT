const express = require('express');
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

const PORT = process.env.PORT || 8000;

const app = express();

// **Middleware.
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());


// ** Connection db

const db = async () =>{
    try {
        await mongoose.connect(
            process.env.DB_URL,{
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
            }
        )
        console.log("DB CONNECTION")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// db()

app.get('/', (req, res, next) => {
    res.status(200).send("Hello World")
})

// routes middleware
// readdirSync("./routers").map((r) => app.use("/api", require("./routes/" + r)));


readdirSync("./routers").map((r) => app.use("/api/v1", require("./routers/" + r)));

app.listen( PORT, () =>{
    db()
    console.log(`Server started on port ${PORT}`)
})
