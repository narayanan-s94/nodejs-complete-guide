const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
// views folder will be taken default, because
// in order to set views with the folder containing html's
app.set("views", "views");

const adminData = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
app.use(shopRouter);

/* not working */
// // explicit middleware to handle /favicon.ico request from chrome/mozilla/edge browsers by default
// app.get('/favicon.ico', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'node-icon.ico'));
// });

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
});

app.listen(3000); // does both createServer and listen
