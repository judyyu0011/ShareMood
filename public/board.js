$(document).ready(()=>{

    var mood = sessionStorage.getItem("mood");
    var description = sessionStorage.getItem("description");
    if (mood != null) {
        console.log(mood);

        var sticky = document.createElement('div');
        board = document.getElementById('board');
        board.appendChild(sticky);
        sticky.innerHTML = mood + description;
    }

});