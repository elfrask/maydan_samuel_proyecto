require("dotenv").config()

let express = require("express");
let bp = require("body-parser");
let app = express();
let path = require("path");
const { env } = require("process");

app.use(bp.json({}));

let PORT = env["PORT"];

function parse_path(path_file) {
    return path.join(__dirname, path_file)
}

app.get("/", (req, res, netx) => {

    res.sendFile(parse_path("public/index.html"))
});

app.use("/src", express.static("./src"))


app.listen(PORT, () => {

    console.log("server, open in the port:", PORT);
})