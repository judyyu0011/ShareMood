$(document).ready(()=>{
    $('#mood-form').submit((e)=> {
        e.preventDefault();

        // retrieve form inputs
        var moodForm = document.forms['mood-form'];
        var mood = getMood(moodForm);
        var description = moodForm.elements['description'].value;
        var data = {mood: mood, description: description};


        // makes post request 
        $.post('/form', data, function(response) {
            console.log(response);

            // load board
            window.location.href = '/';
        
            // loop over list of stickies, store each sticky
            for (var i = 0; i < response.length; i++) {
                sessionStorage.setItem(i, JSON.stringify(response[i]));
            }

            sessionStorage.setItem("stickies-length", response.length);
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
});