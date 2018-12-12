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

        database.ref().once("value", function (snapshot) {
            event.preventDefault();
            player = $("#player-input").val();
            if (!snapshot.exists()) {
                database.ref("Player1").set({
                    name: player
                })
            }
            else {
                database.ref("Player2").set({
                    name: player
                })
            }
        })

    })
    database.ref("Player1").on("value", function (snapshot) {
        var sv = snapshot.val();
        var user = $("<p>");
        user.text(sv.name);
        $(".p1-name").append(user);
    })
    database.ref("Player2").on("value", function (snapshot) {
        var sv = snapshot.val();
        var user = $("<p>");
        user.text(sv.name);
        $(".p2-name").append(user);
    })



    //------------chat -----------------//
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

    database.ref("/chat").orderByChild("dateAdded").on("child_added", function (snapshot) {
        var sv = snapshot.val();
        var hist = $("<div>");
        hist.text(sv.chat);
        $(".chat").append(hist);
    })
    ///--------game functionality-----------//
    $(".rock").one("click", function () {
        database.ref("Player1/option").once("value", function (snapshot) {
            var rock = $("<div>");
            rock.val("rock");
            if (!snapshot.exists()) {
                database.ref("Player1").set({
                    option: rock
                })
            }
            else {
                database.ref("Player2").set({
                    option: rock
                })
            }
        });
    });
    $(".paper").one("click", function () {
        database.ref("Player1/option").once("value", function (snapshot) {
            var paper = $("<div>");
            paper.val("paper");
            if (!snapshot.exists()) {
                database.ref("Player1").set({
                    option: paper
                })
            }
            else {
                database.ref("Player2").set({
                    option: paper
                })
            }
        });
    })
    $(".scissors").one("click", function () {
        database.ref("Player1/option").once("value", function (snapshot) {
            var scissors = $("<div>");
            scissors.val("scissors");
            if (!snapshot.exists()) {
                database.ref("Player1").set({
                    option: scissors
                })
            }
            else {
                database.ref("Player2").set({
                    option: scissors
                })
                console.log(snapshot.val())
            }
        });
    })
    function checker() {
        if ($(".rock").hasClass("isClicked") && $(".scissors").hasClass("isClicked")) {
            console.log("rock wins");
            $(".rock").removeClass("isClicked");
            $(".scissors").removeClass("isClicked");
        }
    }


});
