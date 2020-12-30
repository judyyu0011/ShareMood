const fs = require('fs');
// const loadHelper = require('./src/LoadHelper.js');

class MoodBoard {

    //dictionary of moods and their respective stickynote colour
    stickyColours = {
        "happy": "yellow",
        "sad": "blue",
        "anxious": "purple",
        "neutral": "green",
        "excited": "orange"
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
                    let converted = this.toJSONArray(str);
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

    toJSONArray(str){
        let arr = [];

        let split= str.split(',{');

        try {
            let JSONSticky = JSON.parse(split[0]);
            arr.push(JSONSticky);
        } catch (err) {
            console.log(err);
        }

        for (let i = 1; i < split.length; i++) {
            let strSticky = "{" + split[i];
            let JSONSticky;
            try {
                JSONSticky = JSON.parse(strSticky);
                arr.push(JSONSticky);
            } catch (err) {
                continue;
            }
        }
        return arr;
    }

    // takes in a JSON object containing mood and message info from frontend form 
    generateSticky(info) {
        let sticky = {};
        sticky.colour = this.stickyColours[info.mood];
        sticky.message = info.description;
        
        if (this.numStickies >= 199) { //cap at 200 stickies. If we have 
            // https://codeforgeek.com/handling-http-status-code-like-a-pro/
            throw new Error("too many stickies");
        }
        
        // set sticky positions
        let pos = this.getStickyPosition();
        sticky.posx = pos.x;
        sticky.posy = pos.y;
        
        // save stickies locally
        this.takenPos.push(pos);
        this.notes.push(sticky);
        this.numStickies += 1;

        // write to disk
        let stringStickies = this.stringifyStickies(this.notes);
        fs.writeFileSync(this.dataPath,stringStickies.toString());

        console.log("new notes on board" + this.notes);
        console.log(this.notes);
    }

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

        console.log(multiple);

        // generate a random number between 0 and 22, multiply by multiple (x range: 50-1050)
        var x = Math.floor(Math.random() * 22) * multiple;

        // generate a random number between 0 and 10, multiply by multiple (y range: 150-600)
        var y = Math.floor(Math.random() * 10) * multiple;

        return JSON.stringify({x:x, y:y});
    }
}

// to export class for use in index + other classes
module.exports = {
    MoodBoard: MoodBoard
}