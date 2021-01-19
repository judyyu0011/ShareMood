$(document).ready(()=>{

    // load board
    $.get('/board', function(data) {
        var board = document.getElementById('board');
        var stickiesContainer = document.getElementById('stickies');

        for (var i = 0; i < data.length; i++) {
            var stickyObject = data[i];

            var stickyMes = stickyObject.message;
            var stickyColor = stickyObject.colour;
            var stickyPosX = stickyObject.posx;
            var stickyPosY = stickyObject.posy;

            var stickyVisual = document.createElement('div');
            stickiesContainer.appendChild(stickyVisual);
            stickyVisual.classList.add('sticky');
            stickyVisual.style.left = stickyPosX + 'px';
            stickyVisual.style.top = stickyPosY + 'px';
            stickyVisual.innerHTML = stickyMes;
            
            // if description is too long, cut it off and replace with ...
            if (stickyVisual.innerHTML.length > 18) {
                stickyVisual.innerHTML = stickyVisual.innerHTML.slice(0, 17) + '...';
            }

            // store the original description in a hidden child elment
            var stickyText = document.createElement('div');
            stickyVisual.appendChild(stickyText);
            stickyText.className = 'sticky-text';

            stickyText.innerHTML = stickyMes;


            // set sticky image based on colour
            setBackground(stickyVisual, stickyColor);

            function setBackground(e, color) {
                if (color == 'purple') {
                    e.style.backgroundImage = "url('images/sticky-purple.png')";
                    e.classList.add('purple');
                } else if (color == 'blue') {
                    e.style.backgroundImage = "url('images/sticky-blue.png')";
                    e.classList.add('blue');
                } else if (color == 'green') {
                    e.style.backgroundImage = "url('images/sticky-green.png')";
                    e.classList.add('green');
                } else if (color == 'yellow') {
                    e.style.backgroundImage = "url('images/sticky-yellow.png')";
                    e.classList.add('yellow');
                } else if (color == 'orange') {
                    e.style.backgroundImage = "url('images/sticky-orange.png')";
                    e.classList.add('orange');
                } 
            }

        }

        var stickyList = document.getElementsByClassName('sticky');

        var popUpContainer = document.createElement('div');
        board.appendChild(popUpContainer);

        popUpContainer.className = 'popup-container';


        // close sticky when user clicks anywhere outside of sticky
        window.onclick = function(event) {
            if (event.target == popUpContainer) {
                // disable opaque background
                popUpContainer.style.display = "none";

                // close sticky
                while (popUpContainer.firstChild) {
                    popUpContainer.removeChild(popUpContainer.firstChild);
                }
            }
        }

        // add an event listener on every sticky
        // a pop up opens upon click
        for (const sticky of stickyList) {
            sticky.addEventListener('click', function() {

                // if there is already a pop up, remove it
                while (popUpContainer.firstChild) {
                    popUpContainer.removeChild(popUpContainer.firstChild);
                }

                // enable opacity background behind sticky
                popUpContainer.style.display="block";

                var popUp = document.createElement('div');
                popUpContainer.appendChild(popUp);
                popUp.classList.add('sticky-popup');
                popUp.classList.add('animate');
                popUp.style.backgroundImage = sticky.style.backgroundImage;

                // sticky mood
                var mood = document.createElement('div');
                popUp.appendChild(mood);
                mood.className = ('popup-mood');

                if (sticky.classList.contains('purple')) {
                    mood.innerHTML = 'Anxious';
                } else if (sticky.classList.contains('blue')) {
                    mood.innerHTML = 'Sad';
                } else if (sticky.classList.contains('green')) {
                    mood.innerHTML = 'Meh';
                } else if (sticky.classList.contains('yellow')) {
                    mood.innerHTML = 'Happy';
                } else if (sticky.classList.contains('orange')) {
                    mood.innerHTML = 'Excited';
                }

                // sticky description
                var popUpDes = document.createElement('span');
                popUp.appendChild(popUpDes);
                popUpDes.className = 'popup-description'
                popUpDes.innerHTML = sticky.firstElementChild.innerHTML;

                var closeContainer = document.createElement('div');
                closeContainer.className = 'close-stickie-container'; //may have to make another close container
                popUp.appendChild(closeContainer);

                var closeButton = document.createElement('span');
                closeContainer.appendChild(closeButton);

                closeButton.innerHTML = '&times;';
                // popUp.appendChild(closeButton);
                closeButton.className = 'close-stickie-button';

                closeButton.addEventListener('click', function() {
                    // disable opacity background
                    popUpContainer.style.display = "none";

                    // remove stickies
                    while (popUpContainer.firstChild) {
                        popUpContainer.removeChild(popUpContainer.firstChild);
                    }
                })
                
            });
        }
    });



    $('#login').submit((e)=> {
        e.preventDefault(); // i love you preventDefault IDK what you do but I appreciate you <3

        var form = document.forms['login'];
        var username = form.elements['uname'].value;
        var password = form.elements['psw'].value;

        var data = {username : username, password: password}
        $.post('/dashboard', data, function(data, status) {
            if (data == "denied") {
                // alert("Wrong username or password.");
                for (e of document.getElementsByClassName('login-input')) {
                    e.style.backgroundColor = "#ffcccc";
                } 
                document.getElementById('invalid-password-warning').style.display = "inline";
            } else {
                window.location.href = '/form.html'; //placeholder
            }
        });
    });

});

function closeLogin() {
    document.getElementById('login-container').style.display='none';
    document.getElementById('invalid-password-warning').style.display = 'none';
    for (e of document.getElementsByClassName('login-input')) {
        e.style.backgroundColor = '#ffffff';
    } 
}