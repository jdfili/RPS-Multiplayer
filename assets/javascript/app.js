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
    var player;
    var p1snapshot;
    var p2snapshot;

    //-----------user-input--------------////
    $(".player-info").html("<input type=text placeholder='enter name here' id='player-input'><input type=submit id='push-info' value='enter'>")

    $("#push-info").one("click", function () {
        event.preventDefault();
        player = $("#player-input").val();
        database.ref().once("value", function (snapshot) {
            if (!snapshot.exists()) {
                database.ref("Player1").set({
                    name: player
                })
                $(".p1-name").text(player);
            }
            else {
                database.ref("Player2").set({
                    name: player
                })
                $(".p2-name").text(player);
            }
        })
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
