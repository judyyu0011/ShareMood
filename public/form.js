$(document).ready(()=>{
    $('#mood-form').submit((e)=> {
        e.preventDefault();

        // retrieve form inputs
        var moodForm = document.forms['mood-form'];
        var mood = getMood(moodForm);
        var description = moodForm.elements['description'].value;
        var data = {mood: mood, description: description};

        // makes post request 
        // $.post('/form', data, function() {
        //     // load board
        //     window.location.href = '/';
        // });

        $.ajax({
            url: '/form',
            type: 'post',
            data: data,
            success: function() {
                window.location.href = '/';
            },
            error: function(xhr, status) {
                // check if xhr.status is defined in $.ajax.statusCode
                // if true, return false to stop this function
                if (typeof this.statusCode[xhr.status] != 'undefined') {
                    return false;
                }
                // else continue
            },
            statusCode: {
                403: function(response) {
                    alert("Board Overcapacity");
                },
                404: function(response) {
                    alert("URL Not Found");
                },
                500: function(response) {
                    alert("Internal Server Error");
                },
                503: function(response) {
                    alert("Sorry for the inconvenience, we apologize that the server is down.");
                }
            }
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