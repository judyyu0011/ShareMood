$(document).ready(() => {
  // handles admin login
  $("#login").submit((e) => {
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

  $.get("/total-stickies", function (data) {
    document.getElementById("stat-total").innerHTML = data;
  });

  $.get("/week-stickies", function (data) {
    document.getElementById("stat-this-week").innerHTML = data;
  });

  $.get("/last-week-stickies", function (data) {
    console.log(data);

    var ctx = document.getElementById("chart1").getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            label: "# of Stickies",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(0, 230, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(0, 230, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

  });

});
