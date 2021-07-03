const express = require("express");
const mongoose = require("mongoose");
//DB CONFIG
const db = require("./database/config");
//
class App {
    constructor() {
        this.express = express();
        //
        this.database();
        this.middlewares();
        this.routes();
        //
        this.express.listen(process.env.PORT || 3000, () =>
            console.log(`online...`)
        );
    }
    //
    database() {
        mongoose.connect(db.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    }
    //
    middlewares() {
        this.express.use(express.json());
    }
    //
    routes() {
        this.express.use(require("./routes"));
    }
}
//
module.exports = new App().express;