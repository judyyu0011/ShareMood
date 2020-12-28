
module.exports = {
    toJsonArray: function(str){
        let arr = [];

    let split = str.split(',{');

    try {
        let JSONSticky = JSON.parse(split[0]);
        arr.push(JSONSticky);
    } catch (err) {
        
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
}

// function toJSONArray(str) {
//     let arr = [];

//     let split = str.split(',{');

//     try {
//         let JSONSticky = JSON.parse(split[0]);
//         arr.push(JSONSticky);
//     } catch (err) {
        
//     }

//     for (let i = 1; i < split.length; i++) {
//         let strSticky = "{" + split[i];
//         let JSONSticky;
//         try {
//             JSONSticky = JSON.parse(strSticky);
//             arr.push(JSONSticky);
//         } catch (err) {
//             continue;
//         }
//     }
//     return arr;
// }


// module.exports.toJSONArray = toJSONArray;