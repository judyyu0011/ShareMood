const express = require("express");
const bodyParser = require("body-parser");
const main = require("./src/Main.js");
const adminVerifier = require("./src/AdminVerifier.js");
const moodboard = require("./src/MoodBoard.js");
const overcapacityError = require("./src/Errors/OverCapacityError.js");
require("dotenv").config();

const mongoose = require("mongoose");
const Sticky = require("./models/sticky.js");

// express app
const app = express();

const port = 3000;

// connect to mongodb
const dbURI = process.env.DBURI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    app.listen(process.env.PORT || port, () =>
      console.log(`http://localhost:${port}`)
    )
  )
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const main = new main.Main();

const board = new moodboard.MoodBoard();
const verifier = new adminVerifier.AdminVerifier();

// handles post request sent from form submit
app.post("/form", (req, res) => {
  // console.log(JSON.stringify(req.body));

  try {
    const sticky = new Sticky(board.generateSticky(req.body));

    console.log(sticky);
    sticky
      .save()
      .then((result) => {
        res.end();
      })
      .catch((err) => {
        console.log(err);
      });
    // res.end();
  } catch (e) {
    if (e instanceof overcapacityError.OverCapacityError) {
      res.status(403).send("Board Overcapacity: Too many stickies on board");
    }
  }
});

// handles get request for sticky data from board
app.get("/board", (req, res) => {
  //send list of all stickies currently on board
  //res.send(board.notes);
  Sticky.find()
    .then((result) => {
      res.send(result); //sends all sticky objects to browser
    })
    .catch((err) => {
      console.log(err);
    });
});

// handles admin login request
app.post("/dashboard", (req, res) => {
  var isAdmin = verifier.isAdmin(req.body);

  if (isAdmin) {
    res.send("hi " + req.body.username + "!"); //placeholder
    res.end();
  } else if (!isAdmin) {
    res.send("denied");
  } else {
    res.end("error");
  }
});

// // mongoose and mongo sandbox routes -- test mongo connection
// app.get("/test-mongo", (req, res) => {
//   const sticky = new Sticky({
//     id: 1,
//     colour: "orange",
//     mood: "Excited",
//     message: "test Mongodb!!!",
//     dayOfWeek: 1,
//     posx: 100,
//     posy: 350,
//   });

//   //save to database
//   //using an instance method on an instance of Sticky
//   sticky
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-stickies", (req, res) => {
//   //find() directly on Sticky, not instance of a Sticky
//   Sticky.find()
//     .then((result) => {
//       res.send(result); //sends all sticky objects to browser
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/single-sticky", (req, res) => {
//   Sticky.Sticky.findById();
// });
