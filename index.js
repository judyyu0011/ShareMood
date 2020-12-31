const express = require('express');
const bodyParser = require('body-parser');
const moodboard = require('./src/MoodBoard.js');
const overcapacityError = require('./src/Errors/OverCapacityError.js');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const board = new moodboard.MoodBoard();

// handles post request sent from form submit
app.post('/form',(req, res)=>{
    // console.log(JSON.stringify(req.body));

    try {
        board.generateSticky(req.body);
        res.end();
    } catch (e){
        if (e instanceof overcapacityError.OverCapacityError){
            res.status(403).send("Board Overcapacity: Too many stickies on board");
        }
    }
});

// handles get request for sticky data from board
app.get('/board', (req, res)=> {
    //send list of all stickies currently on board
    res.send(board.notes);
})

app.listen(process.env.PORT || port, () => console.log(`http://localhost:${port}`));
