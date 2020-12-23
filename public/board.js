$(document).ready(()=>{

    var length = sessionStorage.getItem("stickies-length");

    var stickiesContainer = document.getElementById('stickies');

    // loop over sticky data stored in session storage
    // place and style each sticky
    for (var i = 0; i < length; i++){

        var stickyObject = JSON.parse(sessionStorage.getItem(i));
        console.log(stickyObject);

        var stickyMes = stickyObject.message;
        var stickyColor = stickyObject.colour;
        var stickyPosX = stickyObject.posx;
        var stickyPosY = stickyObject.posy;

        var stickyVisual = document.createElement('div');
        stickiesContainer.appendChild(stickyVisual);
        stickyVisual.innerHTML = stickyMes;

        const stickySize = 50;

        stickyVisual.style.position = 'absolute';
        stickyVisual.style.left = stickyPosX + 'px';
        stickyVisual.style.top = stickyPosY + 'px';
        stickyVisual.style.width = stickySize + 'px';
        stickyVisual.style.height = stickySize + 'px';
        stickyVisual.style.fontSize = '12px';

        // set sticky image based on colour
        if (stickyColor == 'purple') {
            stickyVisual.style.backgroundImage = "url('images/sticky-purple.png')";
            stickyVisual.style.backgroundSize = stickySize + "px " + stickySize + "px";
        } else if (stickyColor == 'blue') {
            stickyVisual.style.backgroundImage = "url('images/sticky-blue.png')";
            stickyVisual.style.backgroundSize = stickySize + "px " + stickySize + "px";
        } else if (stickyColor == 'green') {
            stickyVisual.style.backgroundImage = "url('images/sticky-green.png')";
            stickyVisual.style.backgroundSize = stickySize + "px " + stickySize + "px";
        } else if (stickyColor == 'yellow') {
            stickyVisual.style.backgroundImage = "url('images/sticky-yellow.png')";
            stickyVisual.style.backgroundSize = stickySize + "px " + stickySize + "px";
        } else if (stickyColor == 'orange') {
            stickyVisual.style.backgroundImage = "url('images/sticky-orange.png')";
            stickyVisual.style.backgroundSize = stickySize + "px " + stickySize + "px";
        } 
    }
});