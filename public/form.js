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
                console.log('ajax.success');
                window.location.href = '/';
            },
            error: function(xhr, status) {
                // check if xhr.status is defined in $.ajax.statusCode
                // if true, return false to stop this function
                if (typeof this.statusCode[xhr.status] != 'undefined') {
                    return false;
                }
                // else continue
                console.log('ajax.error');
            },
            statusCode: {
                400: function(response) {
                    console.log('ajax.statusCode: 400');
                    alert("Board Overcapacity");
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