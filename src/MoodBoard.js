

export class MoodBoard {
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
        "meh": "green",
        "excited": "orange"
    }

    notes; //list of stickynotes JSON
    takenPos; //list of taken positions 


    constructor(){
        this.notes = [];
        this.takenPos = [];
    }

    // return list of all notes on board
    getBoard() {
        return notes;
    }

    // takes in a JSON object containing mood and message info from frontend form 
    generateSticky(info) {
        let sticky = {};
        sticky.colour = getStickyColour(info.mood);
        sticky.message = info.message;
        
        let pos = sticky.getStickyPosition();
        if (pos !== false){
            sticky.posx = pos.x;
            sticky.posy = pos.y;
        } else {
            // throw error here??? We want to throw some 400 error or something to FE
        }
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
        if (this.takenPos.length < this.avaliablePos.length){
            pos = this.avaliablePos.pop();
        } else {
            return false; // no more avaliable positions
        }
    }
}