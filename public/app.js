function validateForm() {
    var mood = document.forms["mood-form"]["mood"].value;
    if (mood=="") {
        alert("Please select a mood.")
        console.log("alert");
    } else {
        console.log("what");
    }
}