$(document).ready(() => {

  // handles admin login
  $("#login").submit((e) => {
      console.log("hello");
    e.preventDefault(); // i love you preventDefault IDK what you do but I appreciate you <3

    var form = document.forms["login"];
    var username = form.elements["uname"].value;
    var password = form.elements["psw"].value;

    var data = { username: username, password: password };
    $.post("/dashboard", data, function (data, status) {
      if (data == "denied") {
        // alert("Wrong username or password.");
        for (e of document.getElementsByClassName("login-input")) {
          e.style.backgroundColor = "#ffcccc";
        }
        document.getElementById("invalid-password-warning").style.display =
          "inline";
      } else {
        // close login and display dashboard
        document.getElementById("login-container").style.display = "none";
        document.getElementById("content-container").style.display = "block";
      }
    });
  });

});


