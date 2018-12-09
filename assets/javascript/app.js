$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyBn-gBw1BDoDwyBcYelJm3HqQJcqSWKD3o",
        authDomain: "rps-multiplayer-5bb2e.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-5bb2e.firebaseio.com",
        projectId: "rps-multiplayer-5bb2e",
        storageBucket: "rps-multiplayer-5bb2e.appspot.com",
        messagingSenderId: "455506304117"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var chat = $("#add-chat").val();
   
    //-----------user-input--------------////
    $(".name1-submit").on("click", function () {
        event.preventDefault();
        var name = $("#username1").val();
        var user1 = $("<p>");
        $(".player1-input").remove();
        database.ref("/player1").set({
            name: name,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })

    });
    $(".name2-submit").on("click", function () {
        event.preventDefault();
        var name = $("#username2").val();
        var user2 = $("<p>");
        $(".player2-input").remove();
        database.ref("/player2").set({
            name: name,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })

    });

    database.ref("/player1").on("value", function (snapshot) {
        var sv = snapshot.val();
        var name = $("<p>");
        name.text("Name: " + sv.name);
        $(".p1-name").append(name);
    })

    database.ref("/player2").on("value", function (snapshot) {
        var sv = snapshot.val();
        var name = $("<p>");
        name.text("Name: " + sv.name);
        $(".p2-name").append(name);
    })

//------------chat submit--------------------//
    $(".submit").on("click", function () {
        event.preventDefault();
        var chat = $("#add-chat").val();
        var comms = $("<div>")
        comms.text(chat);
        database.ref("/chat").push({
            chat: chat,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        })
    })

    ////-----chat////
    database.ref("/chat").orderByChild("dateAdded").on("child_added", function (snapshot) {
        var sv = snapshot.val();
        var hist = $("<div>");
        hist.text(sv.chat);
        $(".chat").append(hist);
    })

    $(".rock").one("click", function () {
        console.log("hello");
        //-------chat functionality-------//
        var alert = $("<div>");
        alert.text("You chose rock.");
        $(".chat").append(alert);
        //---------databasestuff-------------//
        $(".rock").addClass("isClicked");
        checker();
    });
    $(".paper").one("click", function () {
        //-------chat functionality-------//
        var alert = $("<div>");
        alert.text("You chose paper.");
        $(".chat").append(alert);
        //---------databasestuff-------------//
    })
    $(".scissors").one("click", function () {
        //-------chat functionality-------//
        var alert = $("<div>");
        alert.text("You chose scissors.");
        $(".chat").append(alert);
        //---------databasestuff-------------//
        $(".scissors").addClass("isClicked");
        checker()
    })
    function checker() {
        if ($(".rock").hasClass("isClicked") && $(".scissors").hasClass("isClicked")) {
            console.log("rock wins");
            $(".rock").removeClass("isClicked");
            $(".scissors").removeClass("isClicked");
        }
    }


});
