const express = require("express");
const bodyParser = require("body-parser");
const main = require("./src/Main.js");
const adminVerifier = require("./src/AdminVerifier.js");
const moodboard = require("./src/MoodBoard.js");
const overcapacityError = require("./src/Errors/OverCapacityError.js");

// express app
const app = express();
const port = 3000;

require("dotenv").config();

// mongoose
const mongoose = require("mongoose");
const Sticky = require("./models/sticky.js");

// connect to mongodb
const dbURI = process.env.DBURI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) =>
    // initiate app once database connection is established
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
  try {
    const sticky = new Sticky(board.generateSticky(req.body));

    console.log(sticky);

    // save sticky to database
    sticky
      .save()
      .then((result) => {
        res.end();
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (e) {
    if (e instanceof overcapacityError.OverCapacityError) {
      res.status(403).send("Board Overcapacity: Too many stickies on board");
    }
  }
});

// handles get request for sticky data from board
app.get("/board", (req, res) => {
  // find all Sticky instances from database
  Sticky.find()
    .then((result) => {
      res.send(result); //sends all sticky objects to browser
    })
    .catch((err) => {
      console.log(err);
    });
});

// get total count of stickies from db, send to admin.js
app.get("/total-stickies", (req, res) => {
  Sticky.countDocuments({})
    .then((count) => {
      res.send(String(count));
    })
    .catch((err) => {
      console.log(err);
    });
});

// get count of stickies created within this week from from db
// send to admin.js
app.get("/week-stickies", (req, res) => {
  var date = new Date();
  var today = date;

  var aWeekAgo = date.getDate() - 7;
  var aWeekAgoDate = new Date();
  aWeekAgoDate.setDate(aWeekAgo);

  Sticky.countDocuments({
    createdAt: {
      $gte: aWeekAgoDate,
      $lt: today,
    },
  })
    .then((count) => {
      res.send(String(count));
    })
    .catch((err) => {
      console.log(err);
    });
});

// get an array of the count of stickies created each day last week
// send to admin.js
app.get("/last-week-stickies", (req, res) => {
  var date = new Date();
  var day = date.getDay();
  var prevMonday = new Date();
  if (day == 1) {
    // today is monday
    prevMonday.setDate(date.getDate() - 7);
  } else if (day == 0) {
    // today is sunday
    prevMonday.setDate(date.getDate() - 6);
  } else {
    prevMonday.setDate(date.getDate() - (day - 1));
  }

  var newDate = prevMonday;
  let promises = [];
  for (var i = 0; i < 7; i++) {
    var dayOf = new Date(new Date(newDate).setHours(00, 00, 00));
    var dayAfter = new Date(new Date(newDate).setHours(23, 59, 59));
    promises.push(
      Sticky.countDocuments({
        createdAt: {
          $gte: dayOf,
          $lt: dayAfter,
        },
      })
    );

    newDate.setDate(newDate.getDate() + 1);
  }

  // Promise.all returns a promise when 
  // all the promises inside the promises array is resolved.
  Promise.all(promises).then((counts) => {
    console.log(counts);
    res.send(counts);
  });
});



// handles admin login request
app.post("/dashboard", (req, res) => {
  var isAdmin = verifier.isAdmin(req.body);

  if (isAdmin) {
    res.send("hi " + req.body.username + "!"); //placeholder
    // res.redirect('/admin')
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
