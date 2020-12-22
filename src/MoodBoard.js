

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

    // gets position Object from avaliable positions
    // if no avaliable position, return false
    getStickyPosition(){
        let pos; //JSON with x & y coordinates
        if (this.avaliablePos.length >= 0){
            pos = this.avaliablePos.pop();
            return pos;
        } else {
            return false; // no more avaliable positions
        }
    }
}

// to export class for use in index + other classes
module.exports = {
    MoodBoard: MoodBoard
}