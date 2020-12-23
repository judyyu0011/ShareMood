

class MoodBoard {
    //list of avaliable stickynote positions
    avaliablePos = [
        { x: 100, y: 100 },
        { x: 1000, y: 100 },
        { x: 795, y: 250 },
        { x: 550, y: 500 },
        { x: 399, y: 300}];

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

    constructor(){
        this.notes = [];
        this.takenPos = [];
    }


    // takes in a JSON object containing mood and message info from frontend form 
    generateSticky(info) {
        let sticky = {};
        sticky.colour = this.getStickyColour(info.mood);
        sticky.message = info.description;
        
        // let pos = sticky.getStickyPosition();
        let pos = this.getStickyPosition();
        if (pos !== false){
            sticky.posx = pos.x;
            sticky.posy = pos.y;
        } else {
            // throw error here??? We want to throw some 400 error or something to FE
        }
        this.takenPos.push(pos);
        this.notes.push(sticky);
    }

    // takes in String mood
    // returns String colour
    getStickyColour(mood){
        return this.stickyColours[mood];
    }

    usedCoordinates = new Set();

    // gets position Object from avaliable positions
    // if no avaliable position, return false
    getStickyPosition(){
        let pos; //JSON with x & y coordinates

        pos = this.generateCoordinates();

        console.log(pos);
        while (this.usedCoordinates.has(pos)) {
            console.log("inside while loop");
            pos = this.generateCoordinates();
        }
        this.usedCoordinates.add(pos);

        console.log(this.usedCoordinates);

        return JSON.parse(pos);

        // if (this.avaliablePos.length >= 0){
        //     pos = this.avaliablePos.pop();
        //     return pos;
        // } else {
        //     return false; // no more avaliable positions
        // }
    }

    generateCoordinates() {

        var multiple = 50 - (Math.floor((Math.random() * 10) + 1));

        // generate a random number between 1 and 21, multiply by multiple (x range: 50-1050)
        var x = Math.floor((Math.random() * 21) + 1) * multiple;

        // generate a random number between 3 and 12, multiply by multiple (y range: 150-600)
        var y = Math.floor((Math.random() * 10) + 1) * multiple;

        return JSON.stringify({x:x, y:y});
    }
}

// to export class for use in index + other classes
module.exports = {
    MoodBoard: MoodBoard
}