const express = require("express");
const app = express();
const port = 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// route select area
const masterRouter = require("./routes/master");
app.use("/area", masterRouter);

//route search data
const searchRouter = require("./routes/api");
app.use("/search", searchRouter);

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});
