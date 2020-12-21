$(document).ready(()=>{
    $('#mood-form').submit((e)=> {
        e.preventDefault();
        var moodForm = document.forms['mood-form'];
        var mood = getMood(moodForm);
        var description = moodForm.elements['description'].value;
        var data = {mood: mood, description: description};

        $.post('/form', data, function(response) {
            console.log(response);
            makeBoard(response);
        });

    });

    // returns the mood selected by user
    function getMood(moodForm) {
        var moodList = moodForm.elements['mood'];
        for (var i = 0; i < moodList.length; i++) {
            if (moodList[i].checked) {
                return moodList[i].value;
            }
        }
        return 'No mood found';
    }

    function makeBoard(stickyData) {
        var board = document.getElementById('board');
        var sticky = document.createElement('div');
        board.appendChild(sticky);
        sticky.innerHTML = stickyData.mood;
    }
});

