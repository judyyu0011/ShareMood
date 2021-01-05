const fs = require('fs');
const LoadHelper = require('./LoadHelper');
const OverCapacityError = require('./Errors/OverCapacityError');

class MoodBoard {

    //dictionary of moods and their respective sticky note colour
    stickyColours = {
        // "happy": "yellow",
        // "sad": "blue",
        // "anxious": "purple",
        // "neutral": "green",
        // "excited": "orange",
        // "reply": "grey"
        "Happy": "yellow",
        "Sad": "blue",
        "Anxious": "purple",
        "Neutral": "green",
        "Excited": "orange",
        "Reply": "grey"
    }

    notes; //list of stickynotes JSON
    takenPos; //list of taken positions 
    numStickies; //counter of number of stickies on board

    dataPath = "./data/stickies.txt";

    constructor(){
        this.notes = [];
        this.takenPos = [];
        this.numStickies = 0;
        this.load();
    }

    load() {
        const path = "./data/"
        // if no data folder exists: make a folder to write to later
        if (!fs.existsSync("./data")){
            fs.mkdirSync("./data");
            return;
        } else {
            fs.readdir(path, ((err, files) => {
                if (err) {
                    Log.error("Cannot read from disk");
                }
                if (files.length === 0) {
                    return;
                }
                //let str = fs.readFileSync("./data/stickies.txt").toString();
                let str = fs.readFileSync(this.dataPath).toString();
                // let converted = loadHelper.toJSONArray(str);
                if (str.length != 0){
                    // let converted = this.toJSONArray(str);
                    let converted = LoadHelper.toJSONArray(str);
                    let filtered = this.filterValidData(converted);
                    // this.notes = converted;
                    if (filtered != false){
                        this.notes = filtered;
                    }
                }
                console.log("Saved stickies:");
                console.log(this.notes);
            }));
        }  
    }

    // filter for valid stickie JSON
    filterValidData(arr){
        let filtered = [];
        for (let elem of arr){
            if (elem.hasOwnProperty("colour") && elem.hasOwnProperty("message") &&
            elem.hasOwnProperty("posx") &&elem.hasOwnProperty("posy")){
                filtered.push(elem);
                this.numStickies += 1;
            }
        }
        if (filtered.length == 0){
            return false;
        }
        return filtered;
    }

    // takes in a JSON object containing mood and message info from frontend form 
    generateSticky(info) {
        let sticky = {};
        sticky.id = this.numStickies + 1;
        // alternatively for set 3 digit ID for aesthetic purposes, type string
        // sticky.id = ("00" + this.numStickies + 1).slice(-3);

        sticky.colour = this.stickyColours[info.mood];
        sticky.mood = info.mood;
        sticky.message = info.description;
        
        if (this.numStickies >= 199) { //cap at 200 stickies
            // https://codeforgeek.com/handling-http-status-code-like-a-pro/
            throw new OverCapacityError.OverCapacityError("OverCapacityError");
        }

        if (info.mood != "Reply"){
            sticky.parent = 0;
        } else {
            sticky.parent = info.parent;
        }
        
        // set sticky positions
        let pos = this.getStickyPosition();
        sticky.posx = pos.x;
        sticky.posy = pos.y;
        
        // save stickies locally
        this.takenPos.push(pos); //is this needed
        this.notes.push(sticky);
        this.numStickies += 1;

        // write to disk
        let stringStickies = this.stringifyStickies(this.notes);
        fs.writeFileSync(this.dataPath,stringStickies.toString());

        console.log("Updated notes on board");
        console.log(this.notes);
    }

    // helper function to convert JSON stickies into strings to save onto disk
    stringifyStickies(stickies){
        let stringStickies = [];
        for (let sticky of stickies){
            stringStickies.push(JSON.stringify(sticky));
        }
        return stringStickies;
    }

    usedCoordinates = new Set();

    // gets position Object from available positions
    // if no available position, return false
    getStickyPosition(){
        let pos; //JSON with x & y coordinates

        pos = this.generateCoordinates();

        // console.log(pos);
        while (this.usedCoordinates.has(pos)) {
            console.log("inside while loop");
            pos = this.generateCoordinates();
        }
        this.usedCoordinates.add(pos);

        return JSON.parse(pos);
    }

    generateCoordinates() {

        var multiple = 50 - Math.floor((Math.random() * 5));

        //console.log(multiple);

        // generate a random number between 0 and 22, multiply by multiple (x range: 0-1300)
        var x = Math.floor(Math.random() * 26) * multiple;

        // generate a random number between 0 and 10, multiply by multiple (y range: 0-650)
        var y = Math.floor(Math.random() * 12.5) * multiple;

        return JSON.stringify({x:x, y:y});
    }
}

// to export class for use in index + other classes
module.exports = {
    MoodBoard: MoodBoard
}